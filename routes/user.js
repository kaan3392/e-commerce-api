const router = require("express").Router();

const {
  deleteUser,
  getAllUsers,
  userStats,
  getSingleUser,
} = require("../controllers/user");
const {
  getAccessToRoute,
  getAdminAccess
} = require("../middlewares/authorization/auth");

router.use([getAccessToRoute, getAdminAccess]);


router.get("/", getAllUsers);

router.get("/stats", userStats);


router.get("/:id", getSingleUser);


router.delete("/:id", deleteUser);

module.exports = router;
