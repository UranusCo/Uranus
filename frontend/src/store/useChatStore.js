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

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });

      try {
        await axiosInstance.patch(`/messages/${userId}/read`);
      } catch (error) {
        console.error("Failed to mark messages as read:", error);
      }
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ messages: [...messages, res.data], replyingToMessage: null });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "send message");
    }
  },

  // Reactions
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

  // Edit message
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

  // Delete message
  deleteMessage: async (messageId, deleteForEveryone = false) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}`, {
        data: { deleteForEveryone },
      });
      set({
        messages: get().messages.map(msg =>
          msg._id === messageId ? { ...msg, isDeleted: true, text: "[Message deleted]" } : msg
        ),
      });
      toast.success("Message deleted");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "delete message");
    }
  },

  // Pin message
  togglePinMessage: async (messageId) => {
    try {
      const res = await axiosInstance.patch(`/messages/pin/${messageId}`);
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

  // Get pinned messages
  getPinnedMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/pinned/${userId}`);
      set({ pinnedMessages: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load pinned messages");
    }
  },

  // Search messages
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

  // Forward message
  forwardMessage: async (messageId, receiverId) => {
    try {
      const res = await axiosInstance.post(`/messages/forward/${messageId}`, { receiverId });
      toast.success("Message forwarded");
      return res.data;
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "forward message");
    }
  },

  // Chat management
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

  // Socket subscriptions
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });

    socket.on("userTyping", (userId) => {
      if (userId === selectedUser._id) {
        const typingUsers = get().typingUsers;
        if (!typingUsers.includes(userId)) {
          set({ typingUsers: [...typingUsers, userId] });
        }
      }
    });

    socket.on("userStopTyping", (userId) => {
      if (userId === selectedUser._id) {
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
      const { messageId, deletedForEveryone } = data;
      set({
        messages: get().messages.map(msg =>
          msg._id === messageId
            ? { ...msg, isDeleted: true, text: "[Message deleted]" }
            : msg
        ),
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

  // Export chat history
  exportChat: async (userId, format = 'json', includeDeleted = false) => {
    try {
      const response = await axiosInstance.get(`/messages/export/${userId}`, {
        params: { format, includeDeleted },
        responseType: format === 'json' ? 'json' : 'blob',
      });

      if (format === 'json') {
        return response.data;
      } else {
        // For text/csv formats, trigger download
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
