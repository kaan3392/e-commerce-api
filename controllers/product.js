const Product = require("../models/Product");
const asyncErrorWrapper = require("express-async-handler");

const createProduct = asyncErrorWrapper(async (req, res, next) => {
  const newProduct = new Product(req.body);
  const savedPro = await newProduct.save();
  return res.status(200).json({ success: true, data: savedPro });
});

const updateProduct = asyncErrorWrapper(async (req, res, next) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  return res.status(200).json({ success: true, data: updateProduct });
});

const deleteProduct = asyncErrorWrapper(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  return res
    .status(200)
    .json({ success: true, message: "Product has been deleted" });
});

const getProduct = asyncErrorWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("comments");
  return res.status(200).json({ success: true, data: product });
});

const getAllProducts = asyncErrorWrapper(async (req, res) => {
  const { newPro, category, filter } = req.query;

  let products;
  if (newPro) {
    products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("comments");
  } else if (category) {
    products = await Product.find({
      categories: {
        $in: [category],
      },
    }).populate("comments");
  } else if (filter) {
    products = await Product.find({ title: new RegExp(filter, "i") }).limit(5);
  } else {
    products = await Product.find();
  }
  return res.status(200).json({success:true, data:products});
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
