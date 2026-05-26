import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { io, getReceiverSocketId } from "../lib/socket.js";
import { sendPushNotification } from "../routes/notification.route.js";
import { Types } from "mongoose";

interface NotificationData {
  recipient: Types.ObjectId | string;
  actor: Types.ObjectId | string;
  type: string;
  title: string;
  body: string;
  metadata?: any;
}

class NotificationService {
  async createNotification({ recipient, actor, type, title, body, metadata }: NotificationData) {
    try {
      // Check recipient preferences
      const user = await User.findById(recipient);
      if (!user) return null;

      const prefs = user.notificationPreferences as any || {};
      
      let shouldNotify = true;
      if (type === "direct_message" && prefs.directMessage === false) shouldNotify = false;
      if (type === "group_message" && prefs.groupMessage === false) shouldNotify = false;
      if (type === "mention" && prefs.mention === false) shouldNotify = false;
      if (type === "friend_request" && prefs.friendRequest === false) shouldNotify = false;
      if (type === "system" && prefs.system === false) shouldNotify = false;

      if (!shouldNotify) return null;

      const notification = new Notification({
        recipient,
        actor,
        type,
        title,
        body,
        metadata,
      });

      await notification.save();

      // Populate actor for the frontend
      const populatedNotification = await Notification.findById(notification._id)
        .populate("actor", "fullName profilePic");

      // Emit realtime update
      const receiverSocketId = getReceiverSocketId(recipient.toString());
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("notification:new", populatedNotification);
        
        // Also emit count update
        const unreadCount = await Notification.countDocuments({ recipient, isRead: false });
        io.to(receiverSocketId).emit("notification:count-update", unreadCount);
      }

      // Send Push Notification
      sendPushNotification(recipient.toString(), {
        title,
        body,
        url: metadata?.conversationId ? `/?chat=${metadata.conversationId}` : "/",
      });

      return populatedNotification;
    } catch (error: any) {
      console.log("Error in NotificationService.createNotification", error.message);
      return null;
    }
  }

  async sendWelcomeNotification(userId: Types.ObjectId | string) {
    return this.createNotification({
      recipient: userId,
      actor: userId, // Self as actor for system notifications
      type: "welcome",
      title: "Welcome to Blink!",
      body: "We're glad you're here. Start chatting with your friends!",
    });
  }
}

export default new NotificationService();
