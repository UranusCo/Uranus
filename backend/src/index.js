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
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "https://uranus.koyeb.app",
      "https://uranus-app.pages.dev"
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static frontend files from backend/public
  app.use(express.static(path.join(__dirname, "../public")));

  // Return index.html for SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  });
}


server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
