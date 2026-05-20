import Friendship from "../models/friendship.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import NotificationService from "../services/notification.service.js";
import mongoose from "mongoose";

// Send Friend Request
export const sendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const requesterId = req.user._id;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid Receiver ID" });
    }

    if (requesterId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself" });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Check for existing relationship in both directions
    const existing = await Friendship.findOne({
      $or: [
        { requesterId, receiverId },
        { requesterId: receiverId, receiverId: requesterId }
      ]
    });

    if (existing) {
      if (existing.status === "accepted") {
        return res.status(400).json({ message: "You are already friends with this user" });
      }
      if (existing.status === "pending") {
        if (existing.requesterId.toString() === requesterId.toString()) {
          return res.status(400).json({ message: "Friend request already sent" });
        } else {
          return res.status(400).json({ message: "You already have a pending friend request from this user" });
        }
      }
      if (existing.status === "blocked") {
        if (existing.requesterId.toString() === requesterId.toString()) {
          return res.status(400).json({ message: "You have blocked this user" });
        } else {
          return res.status(400).json({ message: "Unable to send friend request" });
        }
      }
    }

    // Create new friend request
    const newFriendship = new Friendship({
      requesterId,
      receiverId,
      status: "pending"
    });

    await newFriendship.save();

    const populated = await Friendship.findById(newFriendship._id)
      .populate("requesterId", "fullName email profilePic status statusMessage lastSeen")
      .populate("receiverId", "fullName email profilePic status statusMessage lastSeen");

    // Create DB Notification for receiver
    await NotificationService.createNotification({
      recipient: receiverId,
      actor: requesterId,
      type: "friend_request",
      title: "New Friend Request",
      body: `${req.user.fullName} sent you a friend request.`,
      metadata: {
        conversationId: requesterId
      }
    });

    // Real-time notification over socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("friendRequestReceived", populated);
    }

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error in sendRequest controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Accept Friend Request
export const acceptRequest = async (req, res) => {
  try {
    const { requesterId } = req.body;
    const receiverId = req.user._id;

    if (!requesterId) {
      return res.status(400).json({ message: "Requester ID is required" });
    }

    const friendship = await Friendship.findOne({
      requesterId,
      receiverId,
      status: "pending"
    });

    if (!friendship) {
      return res.status(404).json({ message: "Pending friend request not found" });
    }

    friendship.status = "accepted";
    await friendship.save();

    const populated = await Friendship.findById(friendship._id)
      .populate("requesterId", "fullName email profilePic status statusMessage lastSeen")
      .populate("receiverId", "fullName email profilePic status statusMessage lastSeen");

    // Create DB Notification for requester
    await NotificationService.createNotification({
      recipient: requesterId,
      actor: receiverId,
      type: "friend_accept",
      title: "Friend Request Accepted",
      body: `${req.user.fullName} accepted your friend request.`,
      metadata: {
        conversationId: receiverId
      }
    });

    // Real-time update for requester
    const senderSocketId = getReceiverSocketId(requesterId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("friendRequestAccepted", {
        friendshipId: friendship._id,
        user: {
          _id: req.user._id,
          fullName: req.user.fullName,
          email: req.user.email,
          profilePic: req.user.profilePic,
          status: req.user.status,
          statusMessage: req.user.statusMessage,
          lastSeen: req.user.lastSeen
        }
      });
    }

    res.status(200).json(populated);
  } catch (error) {
    console.error("Error in acceptRequest controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Decline Friend Request
export const declineRequest = async (req, res) => {
  try {
    const { requesterId } = req.body;
    const receiverId = req.user._id;

    if (!requesterId) {
      return res.status(400).json({ message: "Requester ID is required" });
    }

    const friendship = await Friendship.findOne({
      requesterId,
      receiverId,
      status: "pending"
    });

    if (!friendship) {
      return res.status(404).json({ message: "Pending friend request not found" });
    }

    await Friendship.findByIdAndDelete(friendship._id);

    // Emit socket event to requester so they update UI
    const senderSocketId = getReceiverSocketId(requesterId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("friendRequestDeclined", {
        requesterId,
        receiverId
      });
    }

    res.status(200).json({ message: "Friend request declined successfully" });
  } catch (error) {
    console.error("Error in declineRequest controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Block User
export const blockUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const myId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID to block is required" });
    }

    let friendship = await Friendship.findOne({
      $or: [
        { requesterId: myId, receiverId: userId },
        { requesterId: userId, receiverId: myId }
      ]
    });

    if (friendship) {
      friendship.status = "blocked";
      friendship.requesterId = myId; // blocker is requesterId
      friendship.receiverId = userId; // blocked is receiverId
      await friendship.save();
    } else {
      friendship = new Friendship({
        requesterId: myId,
        receiverId: userId,
        status: "blocked"
      });
      await friendship.save();
    }

    // Add User ID to blocker's blockedUsers array to maintain backwards compatibility
    await User.findByIdAndUpdate(myId, {
      $addToSet: { blockedUsers: userId }
    });

    res.status(200).json(friendship);
  } catch (error) {
    console.error("Error in blockUser controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Friend List
export const getFriends = async (req, res) => {
  try {
    const myId = req.user._id;

    const friendships = await Friendship.find({
      status: "accepted",
      $or: [
        { requesterId: myId },
        { receiverId: myId }
      ]
    })
    .populate("requesterId", "fullName email profilePic status statusMessage lastSeen")
    .populate("receiverId", "fullName email profilePic status statusMessage lastSeen");

    const friends = friendships.map((f) => {
      if (f.requesterId._id.toString() === myId.toString()) {
        return f.receiverId;
      } else {
        return f.requesterId;
      }
    });

    res.status(200).json(friends);
  } catch (error) {
    console.error("Error in getFriends controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Pending Requests
export const getPendingRequests = async (req, res) => {
  try {
    const myId = req.user._id;

    const incoming = await Friendship.find({
      receiverId: myId,
      status: "pending"
    }).populate("requesterId", "fullName email profilePic status statusMessage lastSeen");

    const outgoing = await Friendship.find({
      requesterId: myId,
      status: "pending"
    }).populate("receiverId", "fullName email profilePic status statusMessage lastSeen");

    res.status(200).json({ incoming, outgoing });
  } catch (error) {
    console.error("Error in getPendingRequests controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
