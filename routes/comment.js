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
   return res.status(200).json("thanks for your opinion");
  } catch (err) {
   return res.status(500).json(err);
  }
});

module.exports = router;
