import express from "express";
import {
  getAccessToRoute,
  getAdminAccess,
  getOwnerAccess,
} from "../middlewares/authorization/auth.js";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getOneOrAllOrders,
  getIncome,
  getIncomeOfOneProduct,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getAccessToRoute, getAdminAccess, getOneOrAllOrders);

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
