const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const commentRoute = require("./routes/comment");
const stripeRoute = require("./routes/stripe");


dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(cors({
  origin: "https://e-commerce-frontend-three.vercel.app/",
  optionsSuccessStatus: 200
}))

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/comments", commentRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT ||8800, () => {
  console.log("Backend server is ready!");
});
