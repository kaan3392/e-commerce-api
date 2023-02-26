const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");

const getSingleUser = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

const getAllUsers = asyncErrorWrapper(async (req, res) => {
  const query = req.query.new;

  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
  return res.status(200).json({success:true, data:users});
});

const deleteUser = asyncErrorWrapper(async (req, res) => {
  await User.findOneAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "User has been deleted",
  });
});

const userStats = asyncErrorWrapper(async (req, res, next) => {
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

  return res.status(200).json({success:true, data:data});
});

module.exports = { getSingleUser, getAllUsers, deleteUser, userStats };
