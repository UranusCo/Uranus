import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema(
  {
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
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

// Ensure no duplicate friendships in the same direction at database level.
// Bidirectional duplicates will be handled in the controller logic.
friendshipSchema.index({ requesterId: 1, receiverId: 1 }, { unique: true });

const Friendship = mongoose.model("Friendship", friendshipSchema);

export default Friendship;
