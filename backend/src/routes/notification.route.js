import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  updatePreferences,
} from "../controllers/notification.controller.js";
import webpush from "web-push";

const PUBLIC_VAPID_KEY = process.env.VAPID_PUBLIC_KEY;
const PRIVATE_VAPID_KEY = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

const router = express.Router();

// Temporary store for subscriptions
const subscriptions = new Map();

// Push notification subscription
router.post("/push/subscribe", protectRoute, (req, res) => {
  const subscription = req.body;
  subscriptions.set(req.user._id.toString(), subscription);
  res.status(201).json({ message: "Subscribed" });
});

// Helper to send push
export const sendPushNotification = (userId, payload) => {
  const subscription = subscriptions.get(userId.toString());
  if (subscription) {
    webpush.sendNotification(subscription, JSON.stringify(payload)).catch(err => {
      console.error("Error sending push:", err);
      if (err.statusCode === 410) subscriptions.delete(userId.toString());
    });
  }
};

router.get("/", protectRoute, getNotifications);
router.get("/unread-count", protectRoute, getUnreadCount);
router.patch("/:id/read", protectRoute, markAsRead);
router.patch("/read-all", protectRoute, markAllAsRead);
router.delete("/:id", protectRoute, deleteNotification);
router.patch("/preferences", protectRoute, updatePreferences);

export default router;
