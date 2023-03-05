import express from "express";
import payment from "../controllers/stripe.js";
import { getAccessToRoute } from "../middlewares/authorization/auth.js";



const router = express.Router();

router.post("/payment", getAccessToRoute , payment);

export default router;
