const express = require("express");
const authRoute = require("./auth");
const userRoute = require("./user");
const productRoute = require("./product");
const orderRoute = require("./order");
const commentRoute = require("./comment");
const stripeRoute = require("./stripe");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoute);
router.use("/comments", commentRoute);
router.use("/checkout", stripeRoute);

module.exports = router;