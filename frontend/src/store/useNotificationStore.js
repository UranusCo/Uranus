import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { useErrorStore } from "./useErrorStore";
import toast from "react-hot-toast";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isNotificationsLoading: false,
  page: 1,
  hasMore: true,

  // ... (previous methods kept the same)
  getNotifications: async (unreadOnly = false) => {
    set({ isNotificationsLoading: true });
    try {
      const res = await axiosInstance.get(`/notifications?page=1&unreadOnly=${unreadOnly}`);
      set({ notifications: res.data, page: 1, hasMore: res.data.length === 20 });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load notifications");
    } finally {
      set({ isNotificationsLoading: false });
    }
  },

  loadMoreNotifications: async (unreadOnly = false) => {
    const { page, notifications, hasMore } = get();
    if (!hasMore) return;

    try {
      const nextPage = page + 1;
      const res = await axiosInstance.get(`/notifications?page=${nextPage}&unreadOnly=${unreadOnly}`);
      set({
        notifications: [...notifications, ...res.data],
        page: nextPage,
        hasMore: res.data.length === 20,
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load more notifications");
    }
  },

  getUnreadCount: async () => {
    try {
      const res = await axiosInstance.get("/notifications/unread-count");
      set({ unreadCount: res.data.count });
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  },

  markAsRead: async (id) => {
    try {
      await axiosInstance.patch(`/notifications/${id}/read`);
      set({
        notifications: get().notifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        ),
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "mark notification as read");
    }
  },

  markAllAsRead: async () => {
    try {
      await axiosInstance.patch("/notifications/read-all");
      set({
        notifications: get().notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      });
      toast.success("All notifications marked as read");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "mark all as read");
    }
  },

  deleteNotification: async (id) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      set({
        notifications: get().notifications.filter((n) => n._id !== id),
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "delete notification");
    }
  },

  updatePreferences: async (preferences) => {
    try {
      const res = await axiosInstance.patch("/notifications/preferences", { preferences });
      const authUser = useAuthStore.getState().authUser;
      if (authUser) {
        useAuthStore.setState({
          authUser: { ...authUser, notificationPreferences: res.data },
        });
      }
      toast.success("Notification preferences updated");
      return res.data;
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "update preferences");
    }
  },
  subscribeToPushNotifications: async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    try {
      // Dynamically fetch public key from backend
      const keyRes = await axiosInstance.get('/notifications/push/key');
      const publicKey = keyRes.data.publicKey;

      if (!publicKey) {
        throw new Error("VAPID public key not configured on server.");
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      await axiosInstance.post('/notifications/push/subscribe', subscription);
      toast.success("Push notifications enabled!");
    } catch (error) {
      console.error("Failed to subscribe to push:", error);
      toast.error("Could not enable push notifications.");
    }
  },
  subscribeToNotifications: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("notification:new", (notification) => {
      set({
        notifications: [notification, ...get().notifications],
      });
      toast.success(`${notification.title}: ${notification.body}`, {
        icon: "🔔",
      });
    });

    socket.on("notification:count-update", (count) => {
      set({ unreadCount: count });
    });
    
    // ... socket listener rest kept the same
    socket.on("notification:read", (id) => {
      set({
        notifications: get().notifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        ),
      });
    });

    socket.on("notification:all-read", () => {
      set({
        notifications: get().notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      });
    });

    socket.on("notification:deleted", (id) => {
      set({
        notifications: get().notifications.filter((n) => n._id !== id),
      });
    });
  },

  unsubscribeFromNotifications: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("notification:new");
    socket.off("notification:count-update");
    socket.off("notification:read");
    socket.off("notification:all-read");
    socket.off("notification:deleted");
  },
}));
