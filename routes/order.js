const router = require("express").Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getOneOrAllOrders,
  getIncome,
  getIncomeOfOneProduct,
} = require("../controllers/order");
const {
  getAccessToRoute,
  getAdminAccess,
  getOwnerAccess,
} = require("../middlewares/authorization/auth");

router.post("/", getAccessToRoute, createOrder);

router.put("/:id", getAdminAccess, updateOrder);

router.delete("/:id", getAdminAccess, deleteOrder);

router.get("/find/:id", [getAccessToRoute, getOwnerAccess], getUserOrder);

router.get("/", getAdminAccess, getOneOrAllOrders);

router.get("/income", getAdminAccess, getIncome);

router.get("/income/:id", getAdminAccess, getIncomeOfOneProduct);

module.exports = router;
