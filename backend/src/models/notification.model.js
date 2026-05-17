import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "direct_message",
        "group_message",
        "mention",
        "reply",
        "friend_request",
        "friend_accept",
        "follow",
        "reaction",
        "welcome",
        "announcement",
        "security",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    metadata: {
      messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
      conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
      reactionType: String,
      link: String,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
