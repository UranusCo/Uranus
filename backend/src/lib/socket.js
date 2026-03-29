import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}
const userStatusMap = {}; // {userId: status}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    userStatusMap[userId] = "online";
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Typing events
  socket.on("typing", (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", userId);
    }
  });

  socket.on("stopTyping", (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userStopTyping", userId);
    }
  });

  // Read receipt
  socket.on("messageRead", (data) => {
    const { senderId, receiverId } = data;
    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messagesReadReceipt", receiverId);
    }
  });

  // Status updates
  socket.on("statusUpdated", (data) => {
    userStatusMap[userId] = data.status;
    io.emit("userStatusChanged", {
      userId,
      status: data.status,
      statusMessage: data.statusMessage,
    });
  });

  // Activity status
  socket.on("userActive", (userId) => {
    io.emit("userActivityOnline", userId);
  });

  socket.on("userInactive", (userId) => {
    io.emit("userActivityOffline", userId);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    delete userStatusMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    io.emit("userOffline", userId);
  });
});

export { io, app, server };
