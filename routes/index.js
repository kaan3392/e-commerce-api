import express from "express";
import authRoute from "./auth.js";
import userRoute from "./user.js";
import productRoute from "./product.js";
import orderRoute from "./order.js";
import commentRoute from "./comment.js";
import stripeRoute from "./stripe.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoute);
router.use("/comments", commentRoute);
router.use("/checkout", stripeRoute);

export default router;