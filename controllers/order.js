import Order from "../models/Order.js";
import asyncErrorWrapper from "express-async-handler";
import mongoose from "mongoose";

const {ObjectId} = mongoose.Types;

export const createOrder = asyncErrorWrapper(async (req, res, next) => {
  const newOrder = new Order(req.body);

  const savedOrder = await newOrder.save();
  return res.status(200).json({success:true, data:savedOrder});
});

export const updateOrder = asyncErrorWrapper(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  return res.status(200).json({success:true, data:updatedOrder});
});

export const deleteOrder = asyncErrorWrapper(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  return res.status(200).json({success:true, message:"Order has been deleted!"});
});

export const getUserOrder = asyncErrorWrapper(async (req, res) => {
  const order = await Order.find({ userId: req.params.id })
    .sort({ createdAt: -1 })
    .populate("userId")
    .populate("orderItems.product");
  return res.status(200).json({success:true, data:order});
});

export const getOneOrAllOrders = asyncErrorWrapper(async (req, res) => {
  const { id } = req.query;

  let orders;
  if (id) {
    orders = await Order.findById(id)
      .populate("userId")
      .populate("orderItems.product");
  } else {
    orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("orderItems.product");
  }
  return res.status(200).json({success:true, data:orders});
});

export const getIncome = asyncErrorWrapper(async (req, res) => {
  const { compare } = req.query;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  let income;
  if (compare) {
    income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
  } else {
    income = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
  }
  return res.status(200).json({success:true, data:income});
});

export const getIncomeOfOneProduct = asyncErrorWrapper(async (req, res) => {
  const productId = req.params.id;
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const income = await Order.aggregate([
    {
      $unwind: "$orderItems",
    },
    {
      $match: {
        createdAt: { $gte: lastYear },
        "orderItems.product": ObjectId(productId),
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$orderItems.totalPriceInCart",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);
  return res.status(200).json({success:true, data:income});
});

