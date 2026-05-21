import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
  searchUsers,
  markMessagesAsRead,
  addReaction,
  removeReaction,
  editMessage,
  deleteMessage,
  togglePinMessage,
  getPinnedMessages,
  searchMessages,
  forwardMessage,
  updateUserStatus,
  getUserStatus,
  setChatDisappearing,
  getLockedChats,
  lockChat,
  unlockChat,
  markViewOnceOpened,
  getCommunityData,
  toggleArchiveChat,
  togglePinChat,
  toggleMuteChat,
  clearChatHistory,
  updateTheme,
  setChatBackground,
  exportChat,
} from "../controllers/message.controller.js";

const router = express.Router();

// User and chat endpoints
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/search", protectRoute, searchUsers);
router.patch("/:userId/read", protectRoute, markMessagesAsRead);

// Message actions
router.post("/send/:id", protectRoute, sendMessage);
router.post("/reaction/:messageId/add", protectRoute, addReaction);
router.post("/reaction/:messageId/remove", protectRoute, removeReaction);
router.patch("/edit/:messageId", protectRoute, editMessage);
router.delete("/clear/:userId", protectRoute, clearChatHistory);
router.delete("/:messageId", protectRoute, deleteMessage);
router.patch("/pin/message/:messageId", protectRoute, togglePinMessage);
router.get("/pinned/:userId", protectRoute, getPinnedMessages);
router.get("/search/:userId", protectRoute, searchMessages);
router.post("/forward/:messageId", protectRoute, forwardMessage);

// User status
router.post("/status/update", protectRoute, updateUserStatus);
router.get("/status/:userId", protectRoute, getUserStatus);

// Privacy and locked chat management
router.patch("/settings/disappearing/:userId", protectRoute, setChatDisappearing);
router.get("/locked", protectRoute, getLockedChats);
router.patch("/lock/:userId", protectRoute, lockChat);
router.post("/unlock/:userId", protectRoute, unlockChat);
router.patch("/view-once/:messageId/open", protectRoute, markViewOnceOpened);

// Chat management
router.patch("/archive/:userId", protectRoute, toggleArchiveChat);
router.patch("/pin/:userId", protectRoute, togglePinChat);
router.patch("/mute/:userId", protectRoute, toggleMuteChat);

// Chat export
router.get("/export/:userId", protectRoute, exportChat);

// User preferences
router.patch("/theme/update", protectRoute, updateTheme);
router.post("/background", protectRoute, setChatBackground);

// Fallback: get messages for a chat by user id (must be last to avoid matching static routes)
router.get("/:id", protectRoute, getMessages);

export default router;
