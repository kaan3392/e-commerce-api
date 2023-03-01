import User from "../models/User.js";
import asyncErrorWrapper from "express-async-handler";
import CustomError from "../helpers/error/CustomError.js";

export const getAllUsers = asyncErrorWrapper(async (req, res) => {
  const query = req.query.new;

  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
    
  return res.status(200).json(users);
});

export const getSingleUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is no user with that id", 404));
  }

  return res.status(200).json( user);
});

export const userStats = asyncErrorWrapper(async (req, res, next) => {
  
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  
  return res.status(200).json( data);
});

export const deleteUser = asyncErrorWrapper(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is no user with that id", 404));
  }

  await user.remove();

  return res.status(200).json({
    success: true,
    message: "User has been deleted",
  });
});

