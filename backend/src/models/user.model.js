import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    // Status and presence
    status: {
      type: String,
      enum: ["online", "away", "dnd", "offline"],
      default: "offline",
    },
    statusMessage: {
      type: String,
      default: "",
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    // Chat settings
    archivedChats: [mongoose.Schema.Types.ObjectId],
    pinnedChats: [mongoose.Schema.Types.ObjectId],
    mutedChats: [mongoose.Schema.Types.ObjectId],
    blockedUsers: [mongoose.Schema.Types.ObjectId],
    // Preferences
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
    chatBackgrounds: {
      type: Map,
      of: String,
      default: new Map(),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
