import mongoose, { Document, Model, Schema } from "mongoose";
import { INotification } from "../types/index.js";

export interface INotificationDocument extends INotification, Document {
  _id: mongoose.Types.ObjectId;
}

const notificationSchema = new Schema<INotificationDocument>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    actor: {
      type: Schema.Types.ObjectId,
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
      messageId: { type: Schema.Types.ObjectId, ref: "Message" },
      conversationId: { type: Schema.Types.ObjectId, ref: "User" },
      groupId: { type: Schema.Types.ObjectId, ref: "Group" },
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

const Notification: Model<INotificationDocument> = mongoose.models.Notification || mongoose.model<INotificationDocument>("Notification", notificationSchema);

export default Notification;
