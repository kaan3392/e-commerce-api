const Comment = require("../models/Comment");
const Product = require("../models/Product");
const asyncErrorWrapper = require("express-async-handler");

const sendComment = asyncErrorWrapper(async (req, res) => {

  const Info = {
    senderId: req.user.id,
    ...req.body
  }
  
  const comment = new Comment(Info);

  const saved = await comment.save();
  await Product.updateOne(
    { _id: req.body.productId },
    { $push: { comments: saved._id } }
  );
  return res
    .status(200)
    .json({ success: true, message: "Thanks for your opinion" });
});

const deleteComment = asyncErrorWrapper(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);


  await Product.updateOne(
    { _id: req.body.productId },
    { $pull: { comments: comment._id } }
  );

  await comment.remove();

  return res
    .status(200)
    .json({ success: true, message: "Comment has been deleted!" });
});

module.exports = { sendComment, deleteComment };
