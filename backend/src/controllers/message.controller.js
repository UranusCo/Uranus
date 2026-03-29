import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    // Allow all file types, but check size
    cb(null, true);
  },
});

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Get all messages from this user (both sent and received)
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "fullName profilePic email")
      .populate("receiverId", "fullName profilePic email");

    // Get unique users from messages and organize by chat
    const userMap = new Map();
    messages.forEach((msg) => {
      const otherUser = msg.senderId._id.toString() === loggedInUserId.toString() ? msg.receiverId : msg.senderId;
      if (otherUser && !userMap.has(otherUser._id.toString())) {
        userMap.set(otherUser._id.toString(), {
          ...otherUser.toObject(),
          lastMessage: msg,
        });
      }
    });

    // Get all other users and add them if not in recent chats
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    allUsers.forEach((user) => {
      if (!userMap.has(user._id.toString())) {
        userMap.set(user._id.toString(), {
          ...user.toObject(),
          lastMessage: null,
        });
      }
    });

    const users = Array.from(userMap.values()).sort((a, b) => {
      const aTime = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(0);
      const bTime = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(0);
      return bTime - aTime;
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const loggedInUserId = req.user._id;

    if (!query || query.trim() === "") {
      return res.status(200).json([]);
    }

    const searchResults = await User.find({
      _id: { $ne: loggedInUserId },
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error in searchUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    // Mark all messages from userId to myId as read
    await Message.updateMany(
      {
        senderId: userId,
        receiverId: myId,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    // Emit read receipt to sender
    const senderSocketId = getReceiverSocketId(userId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messagesRead", myId);
    }

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.log("Error in markMessagesAsRead: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { text, image, replyTo } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      let fileData = null;
      if (req.file) {
        // Upload file to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
          resource_type: "auto",
          public_id: `file_${Date.now()}_${req.file.originalname}`,
        });
        fileData = {
          url: uploadResponse.secure_url,
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
        };
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
        file: fileData,
        isRead: false,
        replyTo: replyTo || null,
      });

      await newMessage.save();
      await newMessage.populate("replyTo");

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
];

// Add reaction to message
export const addReaction = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (!message.reactions) {
      message.reactions = new Map();
    }

    if (!message.reactions.has(emoji)) {
      message.reactions.set(emoji, []);
    }

    const usersWithReaction = message.reactions.get(emoji);
    if (!usersWithReaction.some(id => id.toString() === userId.toString())) {
      usersWithReaction.push(userId);
      message.markModified("reactions");
    }

    await message.save();

    // Emit to both users
    const receiverId = message.receiverId;
    const senderId = message.senderId;
    const otherUserId = userId.toString() === senderId.toString() ? receiverId : senderId;

    const otherUserSocketId = getReceiverSocketId(otherUserId);
    if (otherUserSocketId) {
      io.to(otherUserSocketId).emit("messageReactionAdded", {
        messageId,
        emoji,
        userId,
        reactions: Object.fromEntries(message.reactions),
      });
    }

    res.status(200).json({ reactions: Object.fromEntries(message.reactions) });
  } catch (error) {
    console.log("Error in addReaction: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove reaction from message
export const removeReaction = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.reactions && message.reactions.has(emoji)) {
      const usersWithReaction = message.reactions.get(emoji);
      const index = usersWithReaction.findIndex(id => id.toString() === userId.toString());
      if (index !== -1) {
        usersWithReaction.splice(index, 1);
        if (usersWithReaction.length === 0) {
          message.reactions.delete(emoji);
        }
        message.markModified("reactions");
        await message.save();
      }
    }

    // Emit to other user
    const receiverId = message.receiverId;
    const senderId = message.senderId;
    const otherUserId = userId.toString() === senderId.toString() ? receiverId : senderId;

    const otherUserSocketId = getReceiverSocketId(otherUserId);
    if (otherUserSocketId) {
      io.to(otherUserSocketId).emit("messageReactionRemoved", {
        messageId,
        emoji,
        userId,
        reactions: Object.fromEntries(message.reactions || new Map()),
      });
    }

    res.status(200).json({ reactions: Object.fromEntries(message.reactions || new Map()) });
  } catch (error) {
    console.log("Error in removeReaction: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit message
export const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Can only edit your own messages" });
    }

    // Add to edit history
    if (!message.editHistory) {
      message.editHistory = [];
    }
    message.editHistory.push({
      text: message.text,
      editedAt: new Date(),
    });

    message.text = text;
    message.isEdited = true;
    message.editedAt = new Date();

    await message.save();

    // Emit to other user
    const receiverId = message.receiverId;
    const otherUserSocketId = getReceiverSocketId(receiverId);
    if (otherUserSocketId) {
      io.to(otherUserSocketId).emit("messageEdited", {
        messageId,
        text,
        isEdited: true,
        editedAt: message.editedAt,
      });
    }

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in editMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { deleteForEveryone } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Can only delete your own messages" });
    }

    if (deleteForEveryone) {
      message.isDeleted = true;
      message.deletedAt = new Date();
      message.text = "[Message deleted]";
      message.image = null;
      message.file = null;

      await message.save();

      // Emit to other user
      const receiverId = message.receiverId;
      const otherUserSocketId = getReceiverSocketId(receiverId);
      if (otherUserSocketId) {
        io.to(otherUserSocketId).emit("messageDeleted", { messageId, deletedForEveryone: true });
      }
    } else {
      // Delete only for self
      if (!message.deleteFor) {
        message.deleteFor = [];
      }
      message.deleteFor.push(userId);
      await message.save();
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("Error in deleteMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Pin/Unpin message
export const togglePinMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.isPinned = !message.isPinned;
    message.pinnedAt = message.isPinned ? new Date() : null;
    message.pinnedBy = message.isPinned ? userId : null;

    await message.save();

    // Emit to both users
    const receiverId = message.receiverId;
    const senderId = message.senderId;
    const otherUserId = userId.toString() === senderId.toString() ? receiverId : senderId;

    const otherUserSocketId = getReceiverSocketId(otherUserId);
    if (otherUserSocketId) {
      io.to(otherUserSocketId).emit("messagePinToggled", {
        messageId,
        isPinned: message.isPinned,
      });
    }

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in togglePinMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get pinned messages
export const getPinnedMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    const pinnedMessages = await Message.find({
      isPinned: true,
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
    })
      .populate("senderId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic")
      .sort({ pinnedAt: -1 });

    res.status(200).json(pinnedMessages);
  } catch (error) {
    console.log("Error in getPinnedMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search messages
export const searchMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const { query, sender } = req.query;
    const myId = req.user._id;

    if (!query || query.trim() === "") {
      return res.status(200).json([]);
    }

    const filterObj = {
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
      isDeleted: false,
      text: { $regex: query, $options: "i" },
    };

    if (sender) {
      filterObj.senderId = sender === "me" ? myId : userId;
    }

    const results = await Message.find(filterObj)
      .populate("senderId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(results);
  } catch (error) {
    console.log("Error in searchMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Forwrd message
export const forwardMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { receiverId } = req.body;
    const senderId = req.user._id;

    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    const forwardedMessage = new Message({
      senderId,
      receiverId,
      text: originalMessage.text,
      image: originalMessage.image,
      file: originalMessage.file,
      forwardedFrom: messageId,
      isRead: false,
    });

    await forwardedMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", forwardedMessage);
    }

    res.status(201).json(forwardedMessage);
  } catch (error) {
    console.log("Error in forwardMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user status
export const updateUserStatus = async (req, res) => {
  try {
    const { status, statusMessage } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        status,
        statusMessage: statusMessage || "",
        lastSeen: new Date(),
      },
      { new: true }
    ).select("-password");

    // Broadcast status change
    io.emit("userStatusChanged", {
      userId,
      status,
      statusMessage,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUserStatus: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user status
export const getUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("status statusMessage lastSeen");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserStatus: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Archive chat
export const toggleArchiveChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    const user = await User.findById(myId);

    if (!user.archivedChats) {
      user.archivedChats = [];
    }

    const chatIndex = user.archivedChats.findIndex(id => id.toString() === userId);

    if (chatIndex > -1) {
      user.archivedChats.splice(chatIndex, 1);
    } else {
      user.archivedChats.push(userId);
    }

    await user.save();
    res.status(200).json({ archived: chatIndex === -1 });
  } catch (error) {
    console.log("Error in toggleArchiveChat: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Pin chat
export const togglePinChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    const user = await User.findById(myId);

    if (!user.pinnedChats) {
      user.pinnedChats = [];
    }

    const chatIndex = user.pinnedChats.findIndex(id => id.toString() === userId);

    if (chatIndex > -1) {
      user.pinnedChats.splice(chatIndex, 1);
    } else {
      user.pinnedChats.push(userId);
    }

    await user.save();
    res.status(200).json({ pinned: chatIndex === -1 });
  } catch (error) {
    console.log("Error in togglePinChat: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mute chat
export const toggleMuteChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    const user = await User.findById(myId);

    if (!user.mutedChats) {
      user.mutedChats = [];
    }

    const chatIndex = user.mutedChats.findIndex(id => id.toString() === userId);

    if (chatIndex > -1) {
      user.mutedChats.splice(chatIndex, 1);
    } else {
      user.mutedChats.push(userId);
    }

    await user.save();
    res.status(200).json({ muted: chatIndex === -1 });
  } catch (error) {
    console.log("Error in toggleMuteChat: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Clear chat history
export const clearChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const myId = req.user._id;

    await Message.deleteMany({
      $or: [
        { senderId: myId, receiverId: userId },
        { senderId: userId, receiverId: myId },
      ],
    });

    // Emit to other user
    const otherUserSocketId = getReceiverSocketId(userId);
    if (otherUserSocketId) {
      io.to(otherUserSocketId).emit("chatCleared");
    }

    res.status(200).json({ message: "Chat history cleared" });
  } catch (error) {
    console.log("Error in clearChatHistory: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update theme
export const updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { theme },
      { new: true }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateTheme: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Set chat background
export const setChatBackground = async (req, res) => {
  try {
    const { chatUserId, backgroundUrl } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user.chatBackgrounds) {
      user.chatBackgrounds = new Map();
    }

    user.chatBackgrounds.set(chatUserId, backgroundUrl);
    user.markModified("chatBackgrounds");
    await user.save();

    res.status(200).json({ message: "Background updated" });
  } catch (error) {
    console.log("Error in setChatBackground: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export chat history
export const exportChat = async (req, res) => {
  try {
    const { userId } = req.params;
    const { format = 'json', includeDeleted = false } = req.query;
    const loggedInUserId = req.user._id;

    // Verify the user is part of this chat
    if (loggedInUserId.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: "You can only export your own chats" });
    }

    // Get all messages between these users
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userId },
        { senderId: userId, receiverId: loggedInUserId },
      ],
      ...(includeDeleted ? {} : { isDeleted: false }),
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "fullName email")
      .populate("receiverId", "fullName email")
      .populate("replyTo", "text senderId")
      .populate("forwardedFrom", "text senderId");

    // Get user info for the chat
    const chatUser = await User.findById(userId).select("fullName email");

    const exportData = {
      exportedAt: new Date().toISOString(),
      chatWith: {
        id: chatUser._id,
        name: chatUser.fullName,
        email: chatUser.email,
      },
      totalMessages: messages.length,
      messages: messages.map(msg => ({
        id: msg._id,
        timestamp: msg.createdAt,
        sender: {
          id: msg.senderId._id,
          name: msg.senderId.fullName,
          email: msg.senderId.email,
        },
        text: msg.text,
        image: msg.image,
        file: msg.file,
        isEdited: msg.isEdited,
        editedAt: msg.editedAt,
        editHistory: msg.editHistory,
        isDeleted: msg.isDeleted,
        deletedAt: msg.deletedAt,
        isPinned: msg.isPinned,
        pinnedAt: msg.pinnedAt,
        reactions: Object.fromEntries(msg.reactions),
        replyTo: msg.replyTo ? {
          id: msg.replyTo._id,
          text: msg.replyTo.text,
          sender: msg.replyTo.senderId?.fullName,
        } : null,
        forwardedFrom: msg.forwardedFrom ? {
          id: msg.forwardedFrom._id,
          text: msg.forwardedFrom.text,
          sender: msg.forwardedFrom.senderId?.fullName,
        } : null,
        isRead: msg.isRead,
        readAt: msg.readAt,
      })),
    };

    // Format the response based on requested format
    if (format === 'text') {
      const textContent = formatChatAsText(exportData);
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="chat-${chatUser.fullName.replace(/\s+/g, '_')}.txt"`);
      return res.send(textContent);
    }

    if (format === 'csv') {
      const csvContent = formatChatAsCSV(exportData);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="chat-${chatUser.fullName.replace(/\s+/g, '_')}.csv"`);
      return res.send(csvContent);
    }

    // Default JSON format
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="chat-${chatUser.fullName.replace(/\s+/g, '_')}.json"`);
    res.json(exportData);

  } catch (error) {
    console.log("Error in exportChat: ", error.message);
    res.status(500).json({ error: "Failed to export chat" });
  }
};

// Helper function to format chat as text
function formatChatAsText(data) {
  let text = `Chat Export - ${data.chatWith.name}\n`;
  text += `Exported on: ${new Date(data.exportedAt).toLocaleString()}\n`;
  text += `Total messages: ${data.totalMessages}\n\n`;
  text += '='.repeat(50) + '\n\n';

  data.messages.forEach(msg => {
    const timestamp = new Date(msg.timestamp).toLocaleString();
    const sender = msg.sender.name;
    const isEdited = msg.isEdited ? ' (edited)' : '';
    const isDeleted = msg.isDeleted ? ' (deleted)' : '';

    text += `[${timestamp}] ${sender}${isEdited}${isDeleted}:\n`;

    if (msg.text) {
      text += `${msg.text}\n`;
    }

    if (msg.image) {
      text += `[Image: ${msg.image}]\n`;
    }

    if (msg.file) {
      text += `[File: ${msg.file.name} (${msg.file.size} bytes)]\n`;
    }

    if (msg.replyTo) {
      text += `↳ Replying to: "${msg.replyTo.text}"\n`;
    }

    if (msg.forwardedFrom) {
      text += `↳ Forwarded from: ${msg.forwardedFrom.sender}\n`;
    }

    if (msg.reactions && Object.keys(msg.reactions).length > 0) {
      const reactions = Object.entries(msg.reactions)
        .map(([emoji, users]) => `${emoji}(${users.length})`)
        .join(' ');
      text += `Reactions: ${reactions}\n`;
    }

    if (msg.isPinned) {
      text += '📌 Pinned message\n';
    }

    text += '\n';
  });

  return text;
}

// Helper function to format chat as CSV
function formatChatAsCSV(data) {
  let csv = 'Timestamp,Sender,Message,Image,File,IsEdited,IsDeleted,IsPinned,Reactions,ReplyTo,ForwardedFrom\n';

  data.messages.forEach(msg => {
    const timestamp = new Date(msg.timestamp).toISOString();
    const sender = msg.sender.name;
    const text = msg.text ? `"${msg.text.replace(/"/g, '""')}"` : '';
    const image = msg.image || '';
    const file = msg.file ? `${msg.file.name} (${msg.file.size} bytes)` : '';
    const isEdited = msg.isEdited ? 'Yes' : 'No';
    const isDeleted = msg.isDeleted ? 'Yes' : 'No';
    const isPinned = msg.isPinned ? 'Yes' : 'No';
    const reactions = msg.reactions ? Object.entries(msg.reactions).map
    (([emoji, users]) => `${emoji}(${users.length})`).join('; ') : '';
    const replyTo = msg.replyTo ? `"${msg.replyTo.text?.replace(/"/g, '""') || ''}"`:'';
    const forwardedFrom = msg.forwardedFrom ? msg.forwardedFrom.sender || '' : '';

    csv += `${timestamp},${sender},${text},${image},${file},${isEdited},${isDeleted},${isPinned},"${reactions}",${replyTo},${forwardedFrom}\n`;
  });

  return csv;
}
