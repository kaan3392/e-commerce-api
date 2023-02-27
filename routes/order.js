const router = require("express").Router();
const {
  getAccessToRoute,
  getAdminAccess,
  getOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getOneOrAllOrders,
  getIncome,
  getIncomeOfOneProduct,
} = require("../controllers/order");


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

module.exports = router;
