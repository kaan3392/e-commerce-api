const mongoose = require("mongoose");

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

module.exports = mongoose.model("Comment", CommentSchema);
