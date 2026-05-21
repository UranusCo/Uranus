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
  typingUsers: [],
  searchQuery: "",
  messagesRead: {},
  pinnedMessages: [],
  searchMessageResults: [],
  userStatus: {},
  editingMessageId: null,
  replyingToMessage: null,
  selectedMessagesForBulk: [],
  chatSettings: {},
  lockedChats: [],
  lockedChatPinPrompt: false,
  lockedChatUser: null,
  drafts: {},
  isMoreMessagesAvailable: true,

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
    if (!isLoadMore) set({ isMessagesLoading: true, isMoreMessagesAvailable: true });
    
    try {
      const { messages } = get();
      const before = isLoadMore && messages.length > 0 ? messages[0].createdAt : null;
      const limit = 30;

      const res = await axiosInstance.get(`/messages/${userId}`, {
        params: { limit, before }
      });

      const newMessages = res.data;
      
      if (isLoadMore) {
        set({
          messages: [...newMessages, ...messages],
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
      useErrorStore.getState().handleApiError(error, "load messages");
    } finally {
      if (!isLoadMore) set({ isMessagesLoading: false });
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
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser, searchResults: [], searchQuery: "", editingMessageId: null, replyingToMessage: null });
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
}));
