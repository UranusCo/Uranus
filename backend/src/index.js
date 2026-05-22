import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file if it exists (local development only)
// The .env file is NOT copied to Docker, so this will fail silently in production
// In production (e.g., Koyeb), environment variables are set directly via the platform's UI
const result = dotenv.config();
if (result.error && result.error.code !== 'ENOENT') {
  console.warn('Warning loading .env file:', result.error.message);
}

// Debug: Log which environment variables are loaded
console.log("Environment check - MONGODB_URL is", process.env.MONGODB_URL ? "SET" : "NOT SET");
console.log("Environment check - PORT is", process.env.PORT || "NOT SET (using default 5000)");

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import notificationRoutes from "./routes/notification.route.js";
import friendshipRoutes from "./routes/friendship.route.js";
import workspaceRoutes from "./routes/workspace.route.js";
import { app, server } from "./lib/socket.js";
import { deleteExpiredMessages } from "./controllers/message.controller.js";
import { deleteOldNotifications } from "./controllers/notification.controller.js";

import bcrypt from "bcryptjs";
import User from "./models/user.model.js";

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5001",
      "https://Blink.koyeb.app",
      "https://Blink-app.pages.dev"
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/friends", friendshipRoutes);
app.use("/api/workspaces", workspaceRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static frontend files from backend/public
  app.use(express.static(path.join(__dirname, "../public")));

  // Return index.html for SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  });
}

async function seedHelpCenter() {
  try {
    const email = process.env.HELP_CENTER_EMAIL || "pansiluco@gmail.com";
    const helpCenterPassword = process.env.HELP_CENTER_PASSWORD || "Pansilu2012@";
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(helpCenterPassword, salt);
      const helpCenter = new User({
        email,
        fullName: "Help Center",
        password: hashedPassword,
        profilePic: "",
      });
      await helpCenter.save();
      console.log("Help Center user seeded successfully.");
    } else {
      if (existingUser.fullName !== "Help Center") {
        existingUser.fullName = "Help Center";
        await existingUser.save();
        console.log("Help Center user name corrected to 'Help Center'.");
      }
    }
  } catch (error) {
    console.error("Error seeding Help Center user:", error);
  }
}

server.listen(PORT, async () => {
  console.log("server is running on PORT:" + PORT);
  await connectDB();
  await seedHelpCenter();
  await deleteExpiredMessages();
  await deleteOldNotifications();
  setInterval(deleteExpiredMessages, 20 * 60 * 1000); // every 20 minutes
  setInterval(deleteOldNotifications, 60 * 60 * 1000); // every hour
});
