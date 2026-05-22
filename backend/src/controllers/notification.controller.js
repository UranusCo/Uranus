import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const deleteOldNotifications = async () => {
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
  } catch (error) {
    console.error("Error cleaning up old notifications:", error.message);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;

    await deleteOldNotifications();

    const query = { recipient: userId };
    if (unreadOnly === "true") {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("actor", "fullName profilePic");

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOldNotifications = async () => {
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
  } catch (error) {
    console.error("Error cleaning up old notifications:", error.message);
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await Notification.countDocuments({ recipient: userId, isRead: false });
    res.status(200).json({ count });
  } catch (error) {
    console.log("Error in getUnreadCount controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, recipient: userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Emit count update
    const unreadCount = await Notification.countDocuments({ recipient: userId, isRead: false });
    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("notification:count-update", unreadCount);
      io.to(receiverSocketId).emit("notification:read", id);
    }

    res.status(200).json(notification);
  } catch (error) {
    console.log("Error in markAsRead controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });

    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("notification:count-update", 0);
      io.to(receiverSocketId).emit("notification:all-read");
    }

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.log("Error in markAllAsRead controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteReadNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const deleted = await Notification.deleteMany({ recipient: userId, isRead: true });

    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("notification:count-update", await Notification.countDocuments({ recipient: userId, isRead: false }));
      io.to(receiverSocketId).emit("notification:read-cleared");
    }

    res.status(200).json({ message: "Read notifications deleted", deletedCount: deleted.deletedCount });
  } catch (error) {
    console.log("Error deleting read notifications", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndDelete({ _id: id, recipient: userId });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const unreadCount = await Notification.countDocuments({ recipient: userId, isRead: false });
    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("notification:count-update", unreadCount);
      io.to(receiverSocketId).emit("notification:deleted", id);
    }

    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    console.log("Error in deleteNotification controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { notificationPreferences: preferences },
      { new: true }
    );

    res.status(200).json(user.notificationPreferences);
  } catch (error) {
    console.log("Error in updatePreferences controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
