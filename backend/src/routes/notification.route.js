import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteReadNotifications,
  deleteNotification,
  updatePreferences,
} from "../controllers/notification.controller.js";
import webpush from "web-push";
import User from "../models/user.model.js";

const PUBLIC_VAPID_KEY = process.env.VAPID_PUBLIC_KEY;
const PRIVATE_VAPID_KEY = process.env.VAPID_PRIVATE_KEY;

if (PUBLIC_VAPID_KEY && PRIVATE_VAPID_KEY) {
  webpush.setVapidDetails(
    "mailto:support@Blink-chat.com",
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
  );
} else {
  console.warn("VAPID keys are not set. Push notifications will not work.");
}

const router = express.Router();

// Get VAPID public key
router.get("/push/key", protectRoute, (req, res) => {
  res.json({ publicKey: PUBLIC_VAPID_KEY });
});

// Push notification subscription - persist directly to MongoDB
router.post("/push/subscribe", protectRoute, async (req, res) => {
  try {
    const subscription = req.body;
    await User.findByIdAndUpdate(req.user._id, { pushSubscription: subscription });
    res.status(201).json({ message: "Subscribed" });
  } catch (error) {
    console.error("Error in push subscription route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper to send push dynamically querying DB
export const sendPushNotification = async (userId, payload) => {
  try {
    const user = await User.findById(userId);
    const subscription = user?.pushSubscription;
    if (subscription) {
      webpush.sendNotification(subscription, JSON.stringify(payload)).catch(async (err) => {
        console.error("Error sending web push:", err.message);
        // If subscription is expired or revoked (410 Gone), delete it from DB
        if (err.statusCode === 410 || err.statusCode === 404) {
          await User.findByIdAndUpdate(userId, { pushSubscription: null });
        }
      });
    }
  } catch (error) {
    console.error("Error in sendPushNotification service:", error);
  }
};

router.get("/", protectRoute, getNotifications);
router.get("/unread-count", protectRoute, getUnreadCount);
router.patch("/:id/read", protectRoute, markAsRead);
router.patch("/read-all", protectRoute, markAllAsRead);
router.delete("/read", protectRoute, deleteReadNotifications);
router.delete("/:id", protectRoute, deleteNotification);
router.patch("/preferences", protectRoute, updatePreferences);

export default router;
