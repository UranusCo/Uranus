import mongoose, { Document, Model, Schema } from "mongoose";
import { IWorkspacePoll } from "../types/index.js";

export interface IWorkspacePollDocument extends IWorkspacePoll, Document {
  _id: mongoose.Types.ObjectId;
}

const pollOptionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  votes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const workspacePollSchema = new Schema<IWorkspacePollDocument>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    channelId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [pollOptionSchema],
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const WorkspacePoll: Model<IWorkspacePollDocument> = mongoose.models.WorkspacePoll || mongoose.model<IWorkspacePollDocument>("WorkspacePoll", workspacePollSchema);

export default WorkspacePoll;
