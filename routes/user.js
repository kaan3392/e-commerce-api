import express from "express";
import {
  getAccessToRoute,
  getAdminAccess,
} from "../middlewares/authorization/auth.js";
import {
  deleteUser,
  getAllUsers,
  userStats,
  getSingleUser,
} from "../controllers/user.js";

const router = express.Router();

router.use([getAccessToRoute, getAdminAccess]);

router.get("/", getAllUsers);

router.get("/stats", userStats);

router.get("/:id", getSingleUser);

router.delete("/:id", deleteUser);

export default router;
