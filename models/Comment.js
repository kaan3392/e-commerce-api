import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    productId: String,
    title: String,
    desc: String,
    review: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
