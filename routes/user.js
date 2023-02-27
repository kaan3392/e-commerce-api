const router = require("express").Router();
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const {
  deleteUser,
  getAllUsers,
  userStats,
  getSingleUser,
} = require("../controllers/user");

router.use([getAccessToRoute, getAdminAccess]);

router.get("/", getAllUsers);

router.get("/stats", userStats);

router.get("/:id", getSingleUser);

router.delete("/:id", deleteUser);

module.exports = router;
