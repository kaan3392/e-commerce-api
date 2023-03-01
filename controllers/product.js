import Product from "../models/Product.js";
import asyncErrorWrapper from "express-async-handler";
import CustomError from "../helpers/error/CustomError.js";

export const createProduct = asyncErrorWrapper(async (req, res, next) => {
  const newProduct = new Product(req.body);
  const savedPro = await newProduct.save();
  return res.status(200).json(savedPro);
});

export const updateProduct = asyncErrorWrapper(async (req, res, next) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true, runValidators:true }
  );
  return res.status(200).json(updateProduct);
});

export const deleteProduct = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new CustomError("There is no product wit that id", 404));
  }

  await product.remove();

  return res
    .status(200)
    .json({ success: true, message: "Product has been deleted" });
});

export const getProduct = asyncErrorWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id).populate({
    path: 'comments',
    populate: {
        path: 'senderId',
        select:"username",
        
    }
});
  return res.status(200).json(product);
});

export const getAllProducts = asyncErrorWrapper(async (req, res) => {
  const { newPro, category, filter, price } = req.query;

  let products;
  if (newPro) {
    products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("comments");
  }else if (price) {
    products = await Product.find()
      .sort({ price: -1 })
      .limit(6)
  } else if (category) {
    products = await Product.find({
      categories: {
        $in: [category],
      },
    }).populate("comments");
  } else if (filter) {
    products = await Product.find({ title: new RegExp(filter, "i") }).limit(5);
  } else {
    products = await Product.find().populate("comments");
  }
  return res.status(200).json(products);
});

