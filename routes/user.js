const router = require("express").Router();

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

router.use([getAccessToRoute, getAdminAccess]);

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.get("/stats", userStats);

router.delete("/:id", deleteUser);

module.exports = router;
