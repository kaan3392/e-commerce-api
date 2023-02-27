import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: String },
    brand: { type: String },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    comments:[{type:mongoose.Types.ObjectId, ref:"Comment"}]
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
