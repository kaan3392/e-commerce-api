import express from "express";
import {
  getAccessToRoute,
  getAdminAccess,
  getOwnerAccess,
  getOwnerOrAdminAccess,
} from "../middlewares/authorization/auth.js";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getIncome,
  getIncomeOfOneProduct,
  getSingleOrder,
  getOrders,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getAccessToRoute, getAdminAccess, getOrders);

router.get("/income", getAccessToRoute, getAdminAccess, getIncome);

router.get("/find/:id", [getAccessToRoute, getOwnerAccess], getUserOrder);

router.get("/:id", getAccessToRoute, getOwnerOrAdminAccess, getSingleOrder);

router.post("/", getAccessToRoute, createOrder);

router.put("/:id", getAccessToRoute, getAdminAccess, updateOrder);

router.delete("/:id", getAccessToRoute, getAdminAccess, deleteOrder);

router.get(
  "/income/:id",
  getAccessToRoute,
  getAdminAccess,
  getIncomeOfOneProduct
);

export default router;
