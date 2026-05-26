import mongoose, { Document, Model, Schema } from "mongoose";
import { IFriendship } from "../types/index.js";

export interface IFriendshipDocument extends IFriendship, Document {
  _id: mongoose.Types.ObjectId;
}

const friendshipSchema = new Schema<IFriendshipDocument>(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "blocked"],
      required: true,
    },
  },
  { timestamps: true }
);

friendshipSchema.index({ requesterId: 1, receiverId: 1 }, { unique: true });

const Friendship: Model<IFriendshipDocument> = mongoose.models.Friendship || mongoose.model<IFriendshipDocument>("Friendship", friendshipSchema);

export default Friendship;
