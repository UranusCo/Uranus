import mongoose, { Document, Model, Schema } from "mongoose";
import { IWorkspace } from "../types/index.js";

export interface IWorkspaceDocument extends IWorkspace, Document {
  _id: mongoose.Types.ObjectId;
}

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["chat", "polls", "resources", "voice"],
      default: "chat",
    },
    topic: {
      type: String,
      default: "",
    },
  }
);

const workspaceSchema = new Schema<IWorkspaceDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    channels: [channelSchema],
  },
  { timestamps: true }
);

const Workspace: Model<IWorkspaceDocument> = mongoose.models.Workspace || mongoose.model<IWorkspaceDocument>("Workspace", workspaceSchema);

export default Workspace;
