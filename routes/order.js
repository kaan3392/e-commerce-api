const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../verifyToken");
const ObjectId = require("mongoose").Types.ObjectId;

//create

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user orders

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .populate("userId").populate("orderItems.product");
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one or all orders

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.query;
  try {
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
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get income

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const { compare } = req.query;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
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
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get income of a product

router.get("/income/:id", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.params.id;
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
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
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
