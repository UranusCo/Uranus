import mongoose, { Document, Model, Schema } from "mongoose";
import { IGroup } from "../types/index.js";

export interface IGroupDocument extends IGroup, Document {
  _id: mongoose.Types.ObjectId;
}

const groupSchema = new Schema<IGroupDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Group: Model<IGroupDocument> = mongoose.models.Group || mongoose.model<IGroupDocument>("Group", groupSchema);

export default Group;
