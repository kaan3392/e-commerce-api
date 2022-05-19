const router = require("express").Router();
const Comment = require("../models/Comment");
const Product = require("../models/Product");
const { verifyToken } = require("../verifyToken");

//send comment

router.post("/", verifyToken, async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const saved = await comment.save();
   await Product.updateOne(
      { _id: req.body.productId },
      { $push: { comments: saved._id } }
    );
    res.status(200).json("thanks for your opinion");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get comments of a product

// router.get("/:productId", async (req, res) => {
//   const { rating } = req.query;
//   try {
//     let comments;
//     if (rating) {
//       comments = await Comment.aggregate([
//         { $match: { productId: req.params.productId } },
//         {
//           $group: {
//             _id: null,
//             avg: { $avg: "$review" },
//           },
//         },
//       ]);
//     } else {
//       comments = await Comment.find({ productId: req.params.productId }).sort({
//         createdAt: -1,
//       });
//     }
//     res.status(200).json(comments);
//   } catch (err) {
//     res.status(500).json("Oops! Somethings went so so wrong...");
//   }
// });

module.exports = router;
