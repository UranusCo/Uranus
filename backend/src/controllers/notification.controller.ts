import { Response, NextFunction } from "express";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { io, getReceiverSocketId } from "../lib/socket.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const deleteOldNotifications = async (): Promise<void> => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const deleted = await Notification.deleteMany({
      $or: [
        { createdAt: { $lte: sevenDaysAgo } },
        { isRead: true, updatedAt: { $lte: sevenDaysAgo } },
      ],
    });

    if (deleted.deletedCount > 0) {
      console.log(`Cleaned up ${deleted.deletedCount} old notifications`);
    }
  } catch (error: any) {
    console.error("Error cleaning up old notifications:", error.message);
  }
};

export const getNotifications = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;
  const { page = 1, limit = 20, unreadOnly = false } = req.query;

  await deleteOldNotifications();

  const query: any = { recipient: userId };
  if (unreadOnly === "true") {
    query.isRead = false;
  }

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .populate("actor", "fullName profilePic");

  res.status(200).json(notifications);
});

export const getUnreadCount = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;
  const count = await Notification.countDocuments({ recipient: userId, isRead: false });
  res.status(200).json({ count });
});

export const markAsRead = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const notification = await Notification.findOneAndUpdate(
    { _id: id, recipient: userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    return next(new AppError("Notification not found", 404));
  }

  const unreadCount = await Notification.countDocuments({ recipient: userId, isRead: false });
  const receiverSocketId = getReceiverSocketId(userId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("notification:count-update", unreadCount);
    io.to(receiverSocketId).emit("notification:read", id);
  }

  res.status(200).json(notification);
});

export const markAllAsRead = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;

  await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });

  const receiverSocketId = getReceiverSocketId(userId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("notification:count-update", 0);
    io.to(receiverSocketId).emit("notification:all-read");
  }

  res.status(200).json({ message: "All notifications marked as read" });
});

export const deleteReadNotifications = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;
  const deleted = await Notification.deleteMany({ recipient: userId, isRead: true });

  const receiverSocketId = getReceiverSocketId(userId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("notification:count-update", await Notification.countDocuments({ recipient: userId, isRead: false }));
    io.to(receiverSocketId).emit("notification:read-cleared");
  }

  res.status(200).json({ message: "Read notifications deleted", deletedCount: deleted.deletedCount });
});

export const deleteNotification = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const notification = await Notification.findOneAndDelete({ _id: id, recipient: userId });

  if (!notification) {
    return next(new AppError("Notification not found", 404));
  }

  const unreadCount = await Notification.countDocuments({ recipient: userId, isRead: false });
  const receiverSocketId = getReceiverSocketId(userId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("notification:count-update", unreadCount);
    io.to(receiverSocketId).emit("notification:deleted", id);
  }

  res.status(200).json({ message: "Notification deleted" });
});

export const updatePreferences = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;
  const { preferences } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { notificationPreferences: preferences },
    { new: true }
  );

  res.status(200).json(user?.notificationPreferences);
});
