const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/product");
const { getAdminAccess } = require("../middlewares/authorization/auth");

router.post("/", getAdminAccess, createProduct);

router.put("/:id", getAdminAccess, updateProduct);

router.delete("/:id", getAdminAccess, deleteProduct);

router.get("/:id", getProduct);

router.get("/", getAllProducts);

module.exports = router;
