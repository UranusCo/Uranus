import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";
import { useErrorStore } from "./useErrorStore.js";
import toast from "react-hot-toast";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

interface Notification {
  _id: string;
  recipient: string;
  actor: { _id: string, fullName: string, profilePic: string };
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isNotificationsLoading: boolean;
  page: number;
  hasMore: boolean;
  getNotifications: (unreadOnly?: boolean) => Promise<void>;
  loadMoreNotifications: (unreadOnly?: boolean) => Promise<void>;
  getUnreadCount: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearReadNotifications: () => Promise<void>;
  updatePreferences: (preferences: any) => Promise<any>;
  subscribeToPushNotifications: () => Promise<void>;
  subscribeToNotifications: () => void;
  unsubscribeFromNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isNotificationsLoading: false,
  page: 1,
  hasMore: true,

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
        unreadCount: Math.max(0, get().unreadCount - 1),
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
      const notification = get().notifications.find((n) => n._id === id);
      await axiosInstance.delete(`/notifications/${id}`);
      set({
        notifications: get().notifications.filter((n) => n._id !== id),
        unreadCount: notification && !notification.isRead ? Math.max(0, get().unreadCount - 1) : get().unreadCount,
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "delete notification");
    }
  },

  clearReadNotifications: async () => {
    try {
      await axiosInstance.delete("/notifications/read");
      set({
        notifications: get().notifications.filter((n) => !n.isRead),
      });
      toast.success("Cleared read notifications");
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "clear read notifications");
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
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      toast.error("Push notifications are not supported by your browser.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        toast.error("Notification permission denied. Please enable it in your browser settings.");
        return;
      }

      const keyRes = await axiosInstance.get('/notifications/push/key');
      const publicKey = keyRes.data.publicKey;

      if (!publicKey) {
        throw new Error("VAPID public key not configured on server.");
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
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

    socket.on("notification:new", (notification: Notification) => {
      set({
        notifications: [notification, ...get().notifications],
      });
      toast.success(`${notification.title}: ${notification.body}`, {
        icon: "🔔",
      });
    });

    socket.on("notification:count-update", (count: number) => {
      set({ unreadCount: count });
    });
    
    socket.on("notification:read", (id: string) => {
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

    socket.on("notification:deleted", (id: string) => {
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
