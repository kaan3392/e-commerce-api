const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    sender: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    review: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
