import mongoose, { Document, Model, Schema } from "mongoose";
import { IWorkspaceResource } from "../types/index.js";

export interface IWorkspaceResourceDocument extends IWorkspaceResource, Document {
  _id: mongoose.Types.ObjectId;
}

const workspaceResourceSchema = new Schema<IWorkspaceResourceDocument>(
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
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "application/octet-stream",
    },
    size: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const WorkspaceResource: Model<IWorkspaceResourceDocument> = mongoose.models.WorkspaceResource || mongoose.model<IWorkspaceResourceDocument>("WorkspaceResource", workspaceResourceSchema);

export default WorkspaceResource;
