import express from "express";
import { getAccessToRoute } from "../middlewares/authorization/auth.js";
import { register, login, logout, editDetails, forgotPassword, resetPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout",getAccessToRoute, logout);

router.put("/edit",getAccessToRoute, editDetails)

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword", resetPassword)

export default router;
