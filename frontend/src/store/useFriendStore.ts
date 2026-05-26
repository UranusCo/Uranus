import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";
import { useErrorStore } from "./useErrorStore.js";
import { IUser } from "../types/index.js";

interface FriendRequest {
  _id: string;
  requesterId: IUser;
  receiverId: IUser;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}

interface FriendState {
  friends: IUser[];
  requests: FriendRequest[];
  sentRequests: FriendRequest[];
  isFetchingFriends: boolean;
  isFetchingRequests: boolean;
  fetchFriends: () => Promise<void>;
  fetchRequests: () => Promise<void>;
  sendRequest: (receiverId: string) => Promise<void>;
  acceptRequest: (requesterId: string) => Promise<void>;
  declineRequest: (requesterId: string) => Promise<void>;
  blockUser: (userId: string) => Promise<void>;
  subscribeToFriendEvents: () => void;
  unsubscribeFromFriendEvents: () => void;
}

export const useFriendStore = create<FriendState>((set, get) => ({
  friends: [],
  requests: [], // incoming pending
  sentRequests: [], // outgoing pending
  isFetchingFriends: false,
  isFetchingRequests: false,

  fetchFriends: async () => {
    set({ isFetchingFriends: true });
    try {
      const res = await axiosInstance.get("/friends");
      set({ friends: res.data });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load friends");
    } finally {
      set({ isFetchingFriends: false });
    }
  },

  fetchRequests: async () => {
    set({ isFetchingRequests: true });
    try {
      const res = await axiosInstance.get("/friends/requests");
      set({
        requests: res.data.incoming || [],
        sentRequests: res.data.outgoing || [],
      });
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "load requests");
    } finally {
      set({ isFetchingRequests: false });
    }
  },

  sendRequest: async (receiverId) => {
    try {
      const res = await axiosInstance.post("/friends/request", { receiverId });
      toast.success("Friend request sent");
      set((state) => ({
        sentRequests: [...state.sentRequests, res.data]
      }));
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "send friend request");
    }
  },

  acceptRequest: async (requesterId) => {
    try {
      await axiosInstance.post("/friends/accept", { requesterId });
      toast.success("Friend request accepted");
      const acceptedRequest = get().requests.find(req => req.requesterId?._id === requesterId);
      if (acceptedRequest) {
        set((state) => ({
          requests: state.requests.filter(req => req.requesterId?._id !== requesterId),
          friends: [...state.friends, acceptedRequest.requesterId]
        }));
      } else {
        await get().fetchRequests();
        await get().fetchFriends();
      }
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "accept friend request");
    }
  },

  declineRequest: async (requesterId) => {
    try {
      await axiosInstance.post("/friends/decline", { requesterId });
      toast.success("Friend request declined");
      set((state) => ({
        requests: state.requests.filter(req => req.requesterId?._id !== requesterId)
      }));
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "decline friend request");
    }
  },

  blockUser: async (userId) => {
    try {
      await axiosInstance.post("/friends/block", { userId });
      toast.success("User blocked");
      
      const authStore = useAuthStore.getState();
      if (authStore.authUser) {
        useAuthStore.setState({
          authUser: {
            ...authStore.authUser,
            blockedUsers: [...(authStore.authUser.blockedUsers || []), userId]
          }
        });
      }

      set((state) => ({
        friends: state.friends.filter(f => f._id !== userId),
        requests: state.requests.filter(req => req.requesterId?._id !== userId),
        sentRequests: state.sentRequests.filter(req => req.receiverId?._id !== userId)
      }));
    } catch (error) {
      useErrorStore.getState().handleApiError(error, "block user");
    }
  },

  subscribeToFriendEvents: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("friendRequestReceived", (newRequest: FriendRequest) => {
      const exists = get().requests.some(req => req._id === newRequest._id);
      if (!exists) {
        set((state) => ({
          requests: [...state.requests, newRequest]
        }));
        toast.success(`New friend request from ${newRequest.requesterId?.fullName || "someone"}`);
      }
    });

    socket.on("friendRequestAccepted", (data: { friendshipId: string, user: IUser }) => {
      const exists = get().friends.some(f => f._id === data.user._id);
      if (!exists) {
        set((state) => ({
          friends: [...state.friends, data.user],
          sentRequests: state.sentRequests.filter(req => req._id !== data.friendshipId)
        }));
        toast.success(`${data.user.fullName} accepted your friend request!`);
      }
    });

    socket.on("friendRequestDeclined", (data: { requesterId: string, receiverId: string }) => {
      set((state) => ({
        sentRequests: state.sentRequests.filter(req => req.receiverId?._id !== data.receiverId),
        requests: state.requests.filter(req => req.requesterId?._id !== data.requesterId)
      }));
    });
  },

  unsubscribeFromFriendEvents: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("friendRequestReceived");
    socket.off("friendRequestAccepted");
    socket.off("friendRequestDeclined");
  }
}));
