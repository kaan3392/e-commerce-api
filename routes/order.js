import express from "express";
import {
  getAccessToRoute,
  getAdminAccess,
  getOwnerAccess,
  getOwnerAccessOrAdmin,
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

router.get("/", getAccessToRoute, getOwnerAccessOrAdmin, getOrders);

router.get("/:id", getAccessToRoute, getOwnerAccessOrAdmin, getSingleOrder);

router.post("/", getAccessToRoute, createOrder);

router.get("/income", getAccessToRoute, getAdminAccess, getIncome);

router.get("/find/:id", [getAccessToRoute, getOwnerAccess], getUserOrder);

router.put("/:id", getAccessToRoute, getAdminAccess, updateOrder);

router.delete("/:id", getAccessToRoute, getAdminAccess, deleteOrder);

router.get(
  "/income/:id",
  getAccessToRoute,
  getAdminAccess,
  getIncomeOfOneProduct
);

export default router;
