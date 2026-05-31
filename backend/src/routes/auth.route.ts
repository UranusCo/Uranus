import express from "express";
import { checkAuth, login, logout, signup, updateProfile, getUserByUsername } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/update-profile", protectRoute, updateProfile);
router.get('/u/:username', protectRoute, getUserByUsername);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);

export default router;
