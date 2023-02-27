import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    orderItems: [
      {
        totalPriceInCart:{type:Number},
        color:{type:String},
        quantity: { type: Number},
        product: { type: mongoose.Types.ObjectId, ref: "Product" }
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    paymentMethod: { type: String, default: "cash" },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
