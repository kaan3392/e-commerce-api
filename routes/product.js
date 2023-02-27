const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/product");
const { getAdminAccess, getAccessToRoute } = require("../middlewares/authorization/auth");

router.post("/", getAccessToRoute, getAdminAccess, createProduct);

router.get("/", getAllProducts);

router.put("/:id", getAccessToRoute, getAdminAccess, updateProduct);

router.delete("/:id", getAccessToRoute, getAdminAccess, deleteProduct);

router.get("/:id", getProduct);


module.exports = router;
