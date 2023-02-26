const router = require("express").Router();
const User = require("../models/User");
const {
  deleteUser,
  getAllUsers,
  userStats,
  getSingleUser,
} = require("../controllers/user");
const {
  getAccessToRoute,
  getAdminAccess,
  getOwnerAccess,
} = require("../middlewares/authorization/auth");

router.delete("/:id", getAdminAccess, deleteUser);

router.get("/", getAdminAccess, getAllUsers);

router.get("/stats", getAdminAccess, userStats);

router.get("/:id", getAdminAccess, getSingleUser);

module.exports = router;
