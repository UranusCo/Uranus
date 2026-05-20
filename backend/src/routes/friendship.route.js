import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  sendRequest,
  acceptRequest,
  declineRequest,
  blockUser,
  getFriends,
  getPendingRequests,
} from "../controllers/friendship.controller.js";

const router = express.Router();

router.post("/request", protectRoute, sendRequest);
router.post("/accept", protectRoute, acceptRequest);
router.post("/decline", protectRoute, declineRequest);
router.post("/block", protectRoute, blockUser);
router.get("/", protectRoute, getFriends);
router.get("/requests", protectRoute, getPendingRequests);

export default router;
