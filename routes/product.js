import express from "express";
import { getAdminAccess, getAccessToRoute } from "../middlewares/authorization/auth.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} from "../controllers/product.js";


const router = express.Router();

router.post("/", getAccessToRoute, getAdminAccess, createProduct);

router.get("/", getAllProducts);

router.put("/:id", getAccessToRoute, getAdminAccess, updateProduct);

router.delete("/:id", getAccessToRoute, getAdminAccess, deleteProduct);

router.get("/:id", getProduct);


export default router;
