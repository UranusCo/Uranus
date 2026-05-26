import { Response, NextFunction } from "express";
import Friendship from "../models/friendship.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import NotificationService from "../services/notification.service.js";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

// Send Friend Request
export const sendRequest = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { receiverId } = req.body;
  const requesterId = req.user?._id;

  if (!receiverId) {
    return next(new AppError("Receiver ID is required", 400));
  }

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    return next(new AppError("Invalid Receiver ID", 400));
  }

  if (requesterId?.toString() === receiverId.toString()) {
    return next(new AppError("You cannot send a friend request to yourself", 400));
  }

  const receiverExists = await User.exists({ _id: receiverId });
  if (!receiverExists) {
    return next(new AppError("Receiver not found", 404));
  }

  const existing = await Friendship.findOne({
    $or: [
      { requesterId, receiverId },
      { requesterId: receiverId, receiverId: requesterId }
    ]
  });

  if (existing) {
    if (existing.status === "accepted") {
      return next(new AppError("You are already friends with this user", 400));
    }
    if (existing.status === "pending") {
      if (existing.requesterId.toString() === requesterId?.toString()) {
        return next(new AppError("Friend request already sent", 400));
      } else {
        return next(new AppError("You already have a pending friend request from this user", 400));
      }
    }
    if (existing.status === "blocked") {
      if (existing.requesterId.toString() === requesterId?.toString()) {
        return next(new AppError("You have blocked this user", 400));
      } else {
        return next(new AppError("Unable to send friend request", 400));
      }
    }
  }

  const newFriendship = new Friendship({
    requesterId,
    receiverId,
    status: "pending"
  });

  await newFriendship.save();

  const populated = await Friendship.findById(newFriendship._id)
    .populate("requesterId", "fullName email profilePic status statusMessage lastSeen")
    .populate("receiverId", "fullName email profilePic status statusMessage lastSeen");

  await NotificationService.createNotification({
    recipient: receiverId,
    actor: requesterId,
    type: "friend_request",
    title: "New Friend Request",
    body: `${req.user?.fullName} sent you a friend request.`,
    metadata: {
      conversationId: requesterId
    }
  });

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("friendRequestReceived", populated);
  }

  res.status(201).json(populated);
});

// Accept Friend Request
export const acceptRequest = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { requesterId } = req.body;
  const receiverId = req.user?._id;

  if (!requesterId) {
    return next(new AppError("Requester ID is required", 400));
  }

  const friendship = await Friendship.findOne({
    requesterId,
    receiverId,
    status: "pending"
  });

  if (!friendship) {
    return next(new AppError("Pending friend request not found", 404));
  }

  friendship.status = "accepted";
  await friendship.save();

  const populated = await Friendship.findById(friendship._id)
    .populate("requesterId", "fullName email profilePic status statusMessage lastSeen")
    .populate("receiverId", "fullName email profilePic status statusMessage lastSeen");

  await NotificationService.createNotification({
    recipient: requesterId,
    actor: receiverId,
    type: "friend_accept",
    title: "Friend Request Accepted",
    body: `${req.user?.fullName} accepted your friend request.`,
    metadata: {
      conversationId: receiverId
    }
  });

  const senderSocketId = getReceiverSocketId(requesterId);
  if (senderSocketId) {
    io.to(senderSocketId).emit("friendRequestAccepted", {
      friendshipId: friendship._id,
      user: {
        _id: req.user?._id,
        fullName: req.user?.fullName,
        email: req.user?.email,
        profilePic: req.user?.profilePic,
        status: req.user?.status,
        statusMessage: req.user?.statusMessage,
        lastSeen: req.user?.lastSeen
      }
    });
  }

  res.status(200).json(populated);
});

// Decline Friend Request
export const declineRequest = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { requesterId } = req.body;
  const receiverId = req.user?._id;

  if (!requesterId) {
    return next(new AppError("Requester ID is required", 400));
  }

  const friendship = await Friendship.findOne({
    requesterId,
    receiverId,
    status: "pending"
  });

  if (!friendship) {
    return next(new AppError("Pending friend request not found", 404));
  }

  await Friendship.findByIdAndDelete(friendship._id);

  const senderSocketId = getReceiverSocketId(requesterId);
  if (senderSocketId) {
    io.to(senderSocketId).emit("friendRequestDeclined", {
      requesterId,
      receiverId
    });
  }

  res.status(200).json({ message: "Friend request declined successfully" });
});

// Block User
export const blockUser = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  const myId = req.user?._id;

  if (!userId) {
    return next(new AppError("User ID to block is required", 400));
  }

  let friendship = await Friendship.findOne({
    $or: [
      { requesterId: myId, receiverId: userId },
      { requesterId: userId, receiverId: myId }
    ]
  });

  if (friendship) {
    friendship.status = "blocked";
    friendship.requesterId = myId;
    friendship.receiverId = userId;
    await friendship.save();
  } else {
    friendship = new Friendship({
      requesterId: myId,
      receiverId: userId,
      status: "blocked"
    });
    await friendship.save();
  }

  await User.findByIdAndUpdate(myId, {
    $addToSet: { blockedUsers: userId }
  });

  res.status(200).json(friendship);
});

// Get Friend List
export const getFriends = catchAsync(async (req: AuthRequest, res: Response) => {
  const myId = req.user?._id;

  const friendships = await Friendship.find({
    status: "accepted",
    $or: [
      { requesterId: myId },
      { receiverId: myId }
    ]
  })
  .populate("requesterId", "fullName email profilePic status statusMessage lastSeen")
  .populate("receiverId", "fullName email profilePic status statusMessage lastSeen");

  const friends = friendships.map((f: any) => {
    if (f.requesterId._id.toString() === myId?.toString()) {
      return f.receiverId;
    } else {
      return f.requesterId;
    }
  });

  res.status(200).json(friends);
});

// Get Pending Requests
export const getPendingRequests = catchAsync(async (req: AuthRequest, res: Response) => {
  const myId = req.user?._id;

  const incoming = await Friendship.find({
    receiverId: myId,
    status: "pending"
  }).populate("requesterId", "fullName email profilePic status statusMessage lastSeen");

  const outgoing = await Friendship.find({
    requesterId: myId,
    status: "pending"
  }).populate("receiverId", "fullName email profilePic status statusMessage lastSeen");

  res.status(200).json({ incoming, outgoing });
});
