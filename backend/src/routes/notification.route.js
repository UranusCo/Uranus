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

const router = express.Router();

// Push notification subscription
router.post("/push/subscribe", protectRoute, (req, res) => {
  const subscription = req.body;
  // In a real app, store this subscription in DB
  // For now, we simulate the association with the user
  console.log("Received push subscription from user:", req.user._id);
  res.status(201).json({ message: "Subscribed" });
});

router.get("/", protectRoute, getNotifications);
router.get("/unread-count", protectRoute, getUnreadCount);
router.patch("/:id/read", protectRoute, markAsRead);
router.patch("/read-all", protectRoute, markAllAsRead);
router.delete("/:id", protectRoute, deleteNotification);
router.patch("/preferences", protectRoute, updatePreferences);

export default router;
