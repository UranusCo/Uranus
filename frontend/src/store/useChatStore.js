import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { useErrorStore } from "./useErrorStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  searchResults: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isLoadingMoreMessages: false,
  typingUsers: [],
  searchQuery: "",
  messagesRead: {},
  pinnedMessages: [],
  searchMessageResults: [],
  userStatus: {},
  editingMessageId: null,
  replyingToMessage: null,
  selectedMessagesForBulk: [],
  chatSettings: (() => {
    try {
      const raw = localStorage.getItem('chatSettings');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  })(),
  lockedChats: [],
  lockedChatPinPrompt: false,
  lockedChatUser: null,
  drafts: {},
  isMoreMessagesAvailable: true,

  // Real Workspace/Server structure
  workspaces: [],
  selectedWorkspace: null,
  selectedChannelId: null,
  workspaceMessages: {},
  workspacePolls: {},
  workspaceResources: {},
  channelTypingUsers: [],

  groups: [
    {
      _id: "group-1",
      name: "Design Squad",
      members: ["Alice", "Mika", "Rahul"],
      latestAnnouncement: "Sprint review starts 10AM.",
      poll: {
        question: "Which hero screen should ship first?",
        options: [
          { id: "a", label: "Launch board", votes: 8 },
          { id: "b", label: "In-app status", votes: 5 },
          { id: "c", label: "Media hub", votes: 3 },
        ],
      },
      media: [
        { id: "m1", url: "/assets/sample-1.jpg", label: "Design board" },
        { id: "m2", url: "/assets/sample-2.jpg", label: "Moodboard" },
      ],
    },
  ],
  communities: [
    {
      _id: "community-1",
      name: "Umbrella Workspace",
      groups: ["Design Squad", "Operations"],
      announcements: [
        { id: "a1", text: "Weekly town hall at 5pm on Friday." },
        { id: "a2", text: "New guidelines for community channels released." },
      ],
    },
  ],
  channels: [
    {
      _id: "channel-1",
      name: "Product Updates",
      description: "Read-only channel for releases and product news.",
      subscribers: 1234,
      isSubscribed: true,
      isAdmin: false,
      posts: [
        { id: "p1", title: "Version 5.3 Released", body: "Async drafts and live poll support are now live." },
      ],
    },
  ],
  selectedGroup: null,
  selectedCommunity: null,
  selectedChannel: null,

  setDraft: (userId, text) => {
    set({
      drafts: {
        ...get().drafts,
        [userId]: text,
      },
    });
  },

  setChatSetting: (key, value) => {
    const next = { ...(get().chatSettings || {}), [key]: value };
    try { localStorage.setItem('chatSettings', JSON.stringify(next)); } catch (e) {}
    set({ chatSettings: next });
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  searchUsers: async (query) => {
    set({ searchQuery: query });
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }
    try {
      const res = await axiosInstance.get(`/messages/search?query=${encodeURIComponent(query)}`);
      set({ searchResults: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "search users");
    }
  },

  getMessages: async (userId, isLoadMore = false) => {
    if (!isLoadMore) {
      set({ isMessagesLoading: true, isMoreMessagesAvailable: true });
    } else {
      set({ isLoadingMoreMessages: true });
    }
    
    try {
      const { selectedUser } = get();
      if (!selectedUser || selectedUser._id !== userId) return;

      const { messages } = get();
      const before = isLoadMore && messages.length > 0 ? messages[0].createdAt : null;
      const limit = 30;

      const res = await axiosInstance.get(`/messages/${userId}`, {
        params: { limit, before }
      });

      if (get().selectedUser?._id !== userId) return;

      const newMessages = res.data;
      
      if (isLoadMore) {
        set({
          messages: [...newMessages, ...get().messages],
          isMoreMessagesAvailable: newMessages.length === limit,
        });
      } else {
        set({ 
          messages: newMessages,
          isMoreMessagesAvailable: newMessages.length === limit,
          users: get().users.map(u => u._id === userId ? { ...u, unreadCount: 0 } : u)
        });
      }

      if (!isLoadMore) {
        try {
          await axiosInstance.patch(`/messages/${userId}/read`);
        } catch (error) {
          console.error("Failed to mark messages as read:", error);
        }
      }
    } catch (error) {
      if (get().selectedUser?._id === userId) {
        useErrorStore.getState().handleApiError(error, "load messages");
      }
    } finally {
      if (get().selectedUser?._id === userId) {
        if (isLoadMore) {
          set({ isLoadingMoreMessages: false });
        } else {
          set({ isMessagesLoading: false });
        }
      }
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      let postData;
      const isFormData = messageData && typeof messageData.append === "function";
      if (isFormData) {
        postData = messageData;
      } else {
        const formData = new FormData();
        if (messageData.text) formData.append("text", messageData.text);
        if (messageData.image) formData.append("image", messageData.image);
        if (messageData.file) formData.append("file", messageData.file);
        if (messageData.replyTo) formData.append("replyTo", messageData.replyTo);
        if (messageData.viewOnce) formData.append("viewOnce", messageData.viewOnce);
        if (messageData.expiresAt) formData.append("expiresAt", messageData.expiresAt.toISOString());
        postData = formData;
      }

      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, postData);
      set({ 
        messages: [...messages, res.data], 
        replyingToMessage: null,
        users: get().users.map(u => u._id === selectedUser._id ? { ...u, lastMessage: res.data } : u)
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "send message");
    }
  },

  addReaction: async (messageId, emoji) => {
    try {
      const res = await axiosInstance.post(`/messages/reaction/${messageId}/add`, { emoji });
      set({
        messages: get().messages.map(msg =>
          msg._id === messageId ? { ...msg, reactions: res.data?.reactions || {} } : msg
        ),
      });
    } catch (error) {
      console.error("Error adding reaction:", error);
      useErrorStore.getState().handleApiError(error, "add reaction");
    }
  },

  removeReaction: async (messageId, emoji) => {
    try {
      const res = await axiosInstance.post(`/messages/reaction/${messageId}/remove`, { emoji });
      set({
        messages: get().messages.map(msg =>
          msg._id === messageId ? { ...msg, reactions: res.data?.reactions || {} } : msg
        ),
      });
    } catch (error) {
      console.error("Error removing reaction:", error);
      useErrorStore.getState().handleApiError(error, "remove reaction");
    }
  },

  editMessage: async (messageId, newText) => {
    try {
      const res = await axiosInstance.patch(`/messages/edit/${messageId}`, { text: newText });
      set({
        messages: get().messages.map(msg =>
          msg._id === messageId ? res.data : msg
        ),
        editingMessageId: null,
      });
      toast.success("Message edited");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "edit message");
    }
  },

  deleteMessage: async (messageId) => {
    try {
      const res = await axiosInstance.delete(`/messages/${messageId}`);
      const text = res.data.text || "This message was deleted by You";
      set({
        messages: get().messages.map(msg => {
          let updatedMsg = msg;
          if (msg._id === messageId) {
            updatedMsg = {
              ...updatedMsg,
              isDeleted: true,
              text,
              image: null,
              file: null,
              replyTo: null,
              reactions: {},
              isPinned: false,
            };
          }
          if (msg.replyTo && (msg.replyTo === messageId || msg.replyTo._id === messageId)) {
            updatedMsg = {
              ...updatedMsg,
              replyTo: typeof msg.replyTo === "object"
                ? { ...msg.replyTo, isDeleted: true }
                : { _id: msg.replyTo, isDeleted: true }
            };
          }
          return updatedMsg;
        }),
      });
      toast.success("Message deleted");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "delete message");
    }
  },

  togglePinMessage: async (messageId) => {
    try {
      const res = await axiosInstance.patch(`/messages/pin/message/${messageId}`);
      set({
        messages: get().messages.map(msg =>
          msg._id === messageId ? { ...msg, ...res.data } : msg
        ),
      });
    } catch (error) {
      console.error("Error toggling pin:", error);
      useErrorStore.getState().handleApiError(error, "pin message");
    }
  },

  setChatExpiry: async (userId, expiryLabel, expiresAt) => {
    try {
      const res = await axiosInstance.patch(`/messages/settings/disappearing/${userId}`, {
        expiryLabel,
        expiresAt: expiresAt ? expiresAt.toISOString() : null,
      });
      set({
        chatSettings: {
          ...get().chatSettings,
          [userId]: res.data,
        },
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "update chat expiry");
    }
  },

  getLockedChats: async () => {
    try {
      const res = await axiosInstance.get(`/messages/locked`);
      set({ lockedChats: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load locked chats");
    }
  },

  lockChat: async (userId, pin) => {
    try {
      await axiosInstance.patch(`/messages/lock/${userId}`, { pin });
      await get().getLockedChats();
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "lock chat");
    }
  },

  unlockChat: async (userId, pin) => {
    try {
      await axiosInstance.post(`/messages/unlock/${userId}`, { pin });
      return true;
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "unlock chat");
      return false;
    }
  },

  markViewOnceOpened: async (messageId) => {
    try {
      const res = await axiosInstance.patch(`/messages/view-once/${messageId}/open`);
      set({
        messages: get().messages.map(msg =>
          msg._id === messageId ? res.data : msg
        ),
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "open media");
    }
  },

  getPinnedMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/pinned/${userId}`);
      set({ pinnedMessages: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load pinned messages");
    }
  },

  searchMessages: async (userId, query, sender) => {
    try {
      const params = new URLSearchParams({ query });
      if (sender) params.append("sender", sender);
      const res = await axiosInstance.get(`/messages/search/${userId}?${params}`);
      set({ searchMessageResults: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "search messages");
    }
  },

  forwardMessage: async (messageId, receiverId) => {
    try {
      const res = await axiosInstance.post(`/messages/forward/${messageId}`, { receiverId });
      toast.success("Message forwarded");
      return res.data;
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "forward message");
    }
  },

  toggleArchiveChat: async (userId) => {
    try {
      await axiosInstance.patch(`/messages/archive/${userId}`);
      toast.success("Chat archived");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "archive chat");
    }
  },

  togglePinChat: async (userId) => {
    try {
      await axiosInstance.patch(`/messages/pin/${userId}`);
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "pin chat");
    }
  },

  toggleMuteChat: async (userId) => {
    try {
      await axiosInstance.patch(`/messages/mute/${userId}`);
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "mute chat");
    }
  },

  clearChatHistory: async (userId) => {
    try {
      await axiosInstance.delete(`/messages/clear/${userId}`);
      set({ messages: [] });
      toast.success("Chat history cleared");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "clear chat");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    get().unsubscribeFromMessages();

    socket.on("newMessage", async (newMessage) => {
      const { selectedUser, messages, users } = get();
      const isForActiveChat = selectedUser && 
        (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id);

      if (isForActiveChat) {
        set({
          messages: [...messages, newMessage],
        });
        try {
          await axiosInstance.patch(`/messages/${selectedUser._id}/read`);
          socket.emit("messageRead", { senderId: selectedUser._id, receiverId: useAuthStore.getState().authUser._id });
        } catch (error) {
          console.error("Failed to mark message as read:", error);
        }
      } else {
        const sender = users.find(u => u._id === newMessage.senderId);
        const senderName = sender ? sender.fullName : "Someone";
        toast(`New message from ${senderName}`, { icon: "💬" });
      }

      set({
        users: users.map(user => {
          if (user._id === newMessage.senderId) {
            const isCurrentChat = selectedUser && selectedUser._id === user._id;
            return {
              ...user,
              lastMessage: newMessage,
              unreadCount: isCurrentChat ? 0 : (user.unreadCount || 0) + 1
            };
          }
          return user;
        })
      });
    });

    socket.on("userTyping", (userId) => {
      const { selectedUser } = get();
      if (selectedUser && userId === selectedUser._id) {
        const typingUsers = get().typingUsers;
        if (!typingUsers.includes(userId)) {
          set({ typingUsers: [...typingUsers, userId] });
        }
      }
    });

    socket.on("userStopTyping", (userId) => {
      const { selectedUser } = get();
      if (selectedUser && userId === selectedUser._id) {
        set({ typingUsers: get().typingUsers.filter(id => id !== userId) });
      }
    });

    socket.on("messagesReadReceipt", (userId) => {
      set({
        messages: get().messages.map(msg =>
          msg.receiverId === userId ? { ...msg, isRead: true } : msg
        ),
      });
    });

    socket.on("messageReactionAdded", (data) => {
      try {
        const { messageId, reactions } = data;
        if (!messageId || !reactions) return;
        set({
          messages: get().messages.map(msg =>
            msg._id === messageId ? { ...msg, reactions: reactions || {} } : msg
          ),
        });
      } catch (error) {
        console.error("Error handling messageReactionAdded:", error);
      }
    });

    socket.on("messageReactionRemoved", (data) => {
      try {
        const { messageId, reactions } = data;
        if (!messageId) return;
        set({
          messages: get().messages.map(msg =>
            msg._id === messageId ? { ...msg, reactions: reactions || {} } : msg
          ),
        });
      } catch (error) {
        console.error("Error handling messageReactionRemoved:", error);
      }
    });

    socket.on("messageEdited", (data) => {
      const { messageId, text, isEdited, editedAt } = data;
      set({
        messages: get().messages.map(msg =>
          msg._id === messageId ? { ...msg, text, isEdited, editedAt } : msg
        ),
      });
    });

    socket.on("messageDeleted", (data) => {
      const { messageId, text } = data;
      set({
        messages: get().messages.map(msg => {
          let updatedMsg = msg;
          if (msg._id === messageId) {
            updatedMsg = {
              ...updatedMsg,
              isDeleted: true,
              text: text || "This message was deleted by User",
              image: null,
              file: null,
              replyTo: null,
              reactions: {},
              isPinned: false,
            };
          }
          if (msg.replyTo && (msg.replyTo === messageId || msg.replyTo._id === messageId)) {
            updatedMsg = {
              ...updatedMsg,
              replyTo: typeof msg.replyTo === "object"
                ? { ...msg.replyTo, isDeleted: true }
                : { _id: msg.replyTo, isDeleted: true }
            };
          }
          return updatedMsg;
        }),
      });
    });

    socket.on("messagePinToggled", (data) => {
      try {
        const { messageId, isPinned } = data;
        if (!messageId) return;
        set({
          messages: get().messages.map(msg =>
            msg._id === messageId ? { ...msg, isPinned: Boolean(isPinned) } : msg
          ),
        });
      } catch (error) {
        console.error("Error handling messagePinToggled:", error);
      }
    });

    socket.on("userStatusChanged", (data) => {
      set({
        userStatus: {
          ...get().userStatus,
          [data.userId]: { status: data.status, statusMessage: data.statusMessage },
        },
      });
    });

    socket.on("chatCleared", () => {
      set({ messages: [] });
      toast.info("Chat history was cleared");
    });

    // --- REAL BACKEND WORKSPACE SOCKET EVENTS ---
    socket.on("newWorkspaceMessage", (newMessage) => {
      const { workspaceMessages } = get();
      const channelId = newMessage.channelId;
      const list = workspaceMessages[channelId] || [];
      
      // Avoid duplicate rendering
      if (list.some(msg => msg._id === newMessage._id)) return;

      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: [...list, newMessage]
        }
      });
    });

    socket.on("workspaceReactionAdded", (data) => {
      const { messageId, reactions, channelId } = data;
      const { workspaceMessages } = get();
      const list = workspaceMessages[channelId] || [];
      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: list.map(msg => msg._id === messageId ? { ...msg, reactions } : msg)
        }
      });
    });

    socket.on("workspaceReactionRemoved", (data) => {
      const { messageId, reactions, channelId } = data;
      const { workspaceMessages } = get();
      const list = workspaceMessages[channelId] || [];
      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: list.map(msg => msg._id === messageId ? { ...msg, reactions } : msg)
        }
      });
    });

    socket.on("pollCreated", (newPoll) => {
      const { workspacePolls } = get();
      const channelId = newPoll.channelId;
      const list = workspacePolls[channelId] || [];
      if (list.some(p => p._id === newPoll._id)) return;

      set({
        workspacePolls: {
          ...workspacePolls,
          [channelId]: [newPoll, ...list]
        }
      });
    });

    socket.on("pollVoted", (updatedPoll) => {
      const { workspacePolls } = get();
      const channelId = updatedPoll.channelId;
      const list = workspacePolls[channelId] || [];
      set({
        workspacePolls: {
          ...workspacePolls,
          [channelId]: list.map(p => p._id === updatedPoll._id ? updatedPoll : p)
        }
      });
    });

    socket.on("resourceUploaded", (newRes) => {
      const { workspaceResources } = get();
      const channelId = newRes.channelId;
      const list = workspaceResources[channelId] || [];
      if (list.some(r => r._id === newRes._id)) return;

      set({
        workspaceResources: {
          ...workspaceResources,
          [channelId]: [newRes, ...list]
        }
      });
    });

    socket.on("channelCreated", (data) => {
      const { workspaceId, workspace } = data;
      const { workspaces, selectedWorkspace } = get();
      const updated = workspaces.map(w => w._id === workspaceId ? workspace : w);
      set({
        workspaces: updated,
        selectedWorkspace: selectedWorkspace && selectedWorkspace._id === workspaceId ? workspace : selectedWorkspace
      });
    });

    socket.on("userJoinedWorkspace", (data) => {
      const { workspaceId, workspace } = data;
      const { workspaces, selectedWorkspace } = get();
      const updated = workspaces.map(w => w._id === workspaceId ? workspace : w);
      set({
        workspaces: updated,
        selectedWorkspace: selectedWorkspace && selectedWorkspace._id === workspaceId ? workspace : selectedWorkspace
      });
    });

    socket.on("userChannelTyping", (data) => {
      const { userId, channelId } = data;
      const { selectedChannelId, channelTypingUsers } = get();
      if (selectedChannelId === channelId) {
        if (!channelTypingUsers.includes(userId)) {
          set({ channelTypingUsers: [...channelTypingUsers, userId] });
        }
      }
    });

    socket.on("userChannelStopTyping", (data) => {
      const { userId, channelId } = data;
      const { selectedChannelId, channelTypingUsers } = get();
      if (selectedChannelId === channelId) {
        set({ channelTypingUsers: channelTypingUsers.filter(id => id !== userId) });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("userTyping");
    socket.off("userStopTyping");
    socket.off("messagesReadReceipt");
    socket.off("messageReactionAdded");
    socket.off("messageReactionRemoved");
    socket.off("messageEdited");
    socket.off("messageDeleted");
    socket.off("messagePinToggled");
    socket.off("userStatusChanged");
    socket.off("chatCleared");
    
    // Clean workspace events
    socket.off("newWorkspaceMessage");
    socket.off("workspaceReactionAdded");
    socket.off("workspaceReactionRemoved");
    socket.off("pollCreated");
    socket.off("pollVoted");
    socket.off("resourceUploaded");
    socket.off("channelCreated");
    socket.off("userJoinedWorkspace");
    socket.off("userChannelTyping");
    socket.off("userChannelStopTyping");
  },

  setSelectedUser: (selectedUser) => {
    set({ 
      selectedUser, 
      messages: [], 
      isMoreMessagesAvailable: true,
      searchResults: [], 
      searchQuery: "", 
      editingMessageId: null, 
      replyingToMessage: null 
    });
  },

  clearSearch: () => {
    set({ searchQuery: "", searchResults: [] });
  },

  setEditingMessage: (messageId) => {
    set({ editingMessageId: messageId });
  },

  setReplyingToMessage: (message) => {
    set({ replyingToMessage: message });
  },

  toggleBulkSelect: (messageId) => {
    const selected = get().selectedMessagesForBulk;
    const index = selected.findIndex(id => id === messageId);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(messageId);
    }
    set({ selectedMessagesForBulk: [...selected] });
  },

  clearBulkSelect: () => {
    set({ selectedMessagesForBulk: [] });
  },

  exportChat: async (userId, format = 'json', includeDeleted = false) => {
    try {
      const response = await axiosInstance.get(`/messages/export/${userId}`, {
        params: { format, includeDeleted },
        responseType: format === 'json' ? 'json' : 'blob',
      });

      if (format === 'json') {
        return response.data;
      } else {
        const blob = new Blob([response.data], {
          type: format === 'text' ? 'text/plain' : 'text/csv'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export.${format === 'text' ? 'txt' : 'csv'}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return true;
      }
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "export chat");
      return false;
    }
  },

  initWorkspaces: async () => {
    try {
      const res = await axiosInstance.get("/workspaces");
      const workspaces = res.data;

      // Automatically join the workspace socket room for all workspaces!
      const socket = useAuthStore.getState().socket;
      if (socket) {
        workspaces.forEach(w => {
          socket.emit("joinWorkspace", w._id);
        });
      }

      set({ workspaces });
      
      if (workspaces.length > 0) {
        const defaultWorkspace = workspaces[0];
        get().setSelectedWorkspace(defaultWorkspace);
      }
    } catch (e) {
      console.error("Failed to load workspaces:", e);
      toast.error("Failed to sync workspaces.");
    }
  },

  setSelectedWorkspace: async (workspace) => {
    const defaultChannel = workspace && workspace.channels.length > 0 ? workspace.channels[0]._id : null;
    
    // Join the workspace socket room if not joined already
    const socket = useAuthStore.getState().socket;
    if (socket && workspace) {
      socket.emit("joinWorkspace", workspace._id);
    }

    set({
      selectedWorkspace: workspace,
      selectedChannelId: defaultChannel,
      selectedUser: null,
    });

    if (workspace && defaultChannel) {
      get().fetchChannelData(workspace._id, defaultChannel);
    }
  },

  setSelectedChannelId: async (channelId) => {
    const workspace = get().selectedWorkspace;
    set({ selectedChannelId: channelId });
    if (workspace && channelId) {
      get().fetchChannelData(workspace._id, channelId);
    }
  },

  fetchChannelData: async (workspaceId, channelId) => {
    const workspace = get().selectedWorkspace;
    if (!workspace) return;
    const channel = workspace.channels.find(c => c._id === channelId);
    if (!channel) return;

    try {
      if (channel.type === "chat" || channel.type === "announcements") {
        const res = await axiosInstance.get(`/workspaces/${workspaceId}/messages/${channelId}`);
        set({
          workspaceMessages: {
            ...get().workspaceMessages,
            [channelId]: res.data
          }
        });
      } else if (channel.type === "polls") {
        const res = await axiosInstance.get(`/workspaces/${workspaceId}/polls/${channelId}`);
        set({
          workspacePolls: {
            ...get().workspacePolls,
            [channelId]: res.data
          }
        });
      } else if (channel.type === "resources") {
        const res = await axiosInstance.get(`/workspaces/${workspaceId}/resources/${channelId}`);
        set({
          workspaceResources: {
            ...get().workspaceResources,
            [channelId]: res.data
          }
        });
      }
    } catch (error) {
      console.error("Failed to fetch channel data:", error);
    }
  },

  createWorkspace: async (name, icon) => {
    try {
      const res = await axiosInstance.post("/workspaces", { name, icon });
      const newWorkspace = res.data;
      const { workspaces } = get();

      // Join socket room
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit("joinWorkspace", newWorkspace._id);
      }

      set({
        workspaces: [...workspaces, newWorkspace],
      });
      get().setSelectedWorkspace(newWorkspace);
      toast.success(`Server "${name}" created!`);
    } catch (error) {
      console.error("Failed to create workspace:", error);
      toast.error("Failed to create workspace.");
    }
  },

  createChannel: async (workspaceId, name, type = "chat") => {
    try {
      const res = await axiosInstance.post(`/workspaces/${workspaceId}/channels`, { name, type });
      const { workspace, channel } = res.data;
      const { workspaces } = get();

      const updated = workspaces.map(w => w._id === workspaceId ? workspace : w);
      set({ workspaces: updated });

      const currentActive = get().selectedWorkspace;
      if (currentActive && currentActive._id === workspaceId) {
        set({
          selectedWorkspace: workspace,
          selectedChannelId: channel._id
        });
        get().fetchChannelData(workspaceId, channel._id);
      }

      toast.success(`Channel #${channel.name} created!`);
    } catch (error) {
      console.error("Failed to create channel:", error);
      toast.error("Failed to create channel.");
    }
  },

  sendChannelMessage: async (workspaceId, channelId, text, file = null) => {
    try {
      const formData = new FormData();
      formData.append("text", text || "");
      if (file) {
        formData.append("file", file);
      }

      const res = await axiosInstance.post(`/workspaces/${workspaceId}/messages/${channelId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const newMsg = res.data;
      const { workspaceMessages } = get();
      const list = workspaceMessages[channelId] || [];

      // Avoid double rendering if socket already pushed it
      if (list.some(msg => msg._id === newMsg._id)) return;

      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: [...list, newMsg]
        }
      });
    } catch (error) {
      console.error("Failed to send channel message:", error);
      toast.error("Failed to send message.");
    }
  },

  addChannelReaction: async (channelId, messageId, emoji) => {
    try {
      const { workspaceMessages } = get();
      const list = workspaceMessages[channelId] || [];
      const msg = list.find(m => m._id === messageId);
      if (!msg) return;

      const user = useAuthStore.getState().authUser;
      if (!user) return;

      const userReactions = msg.reactions?.[emoji] || [];
      const hasReacted = userReactions.includes(user._id);

      const path = hasReacted ? "remove" : "add";
      const res = await axiosInstance.post(`/workspaces/messages/${messageId}/reaction/${path}`, { emoji });
      const updatedMsg = res.data;

      set({
        workspaceMessages: {
          ...workspaceMessages,
          [channelId]: list.map(m => m._id === messageId ? updatedMsg : m)
        }
      });
    } catch (error) {
      console.error("Failed to toggle reaction:", error);
    }
  },

  createPoll: async (workspaceId, channelId, question, optionLabels) => {
    try {
      const filteredOptions = optionLabels.filter(lbl => lbl.trim() !== "");
      const res = await axiosInstance.post(`/workspaces/${workspaceId}/polls/${channelId}`, { question, options: filteredOptions });
      const newPoll = res.data;
      const { workspacePolls } = get();
      const list = workspacePolls[channelId] || [];

      set({
        workspacePolls: {
          ...workspacePolls,
          [channelId]: [newPoll, ...list]
        }
      });
      toast.success("Poll launched successfully!");
    } catch (error) {
      console.error("Failed to create poll:", error);
      toast.error("Failed to create poll.");
    }
  },

  voteInPoll: async (workspaceId, channelId, pollId, optionId) => {
    try {
      const res = await axiosInstance.post(`/workspaces/polls/${pollId}/vote`, { optionId });
      const updatedPoll = res.data;
      const { workspacePolls } = get();
      const list = workspacePolls[channelId] || [];

      set({
        workspacePolls: {
          ...workspacePolls,
          [channelId]: list.map(p => p._id === pollId ? updatedPoll : p)
        }
      });
    } catch (error) {
      console.error("Failed to cast vote:", error);
    }
  },

  uploadResource: async (workspaceId, channelId, file) => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post(`/workspaces/${workspaceId}/resources/${channelId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const newRes = res.data;
      const { workspaceResources } = get();
      const list = workspaceResources[channelId] || [];

      set({
        workspaceResources: {
          ...workspaceResources,
          [channelId]: [newRes, ...list]
        }
      });
      toast.success(`Uploaded ${file.name} successfully!`);
    } catch (error) {
      console.error("Failed to upload resource file:", error);
      toast.error("Failed to upload resource.");
    }
  },
}));
