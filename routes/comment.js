import express from "express";
import { getAccessToRoute, getCommentOwnerAccess } from "../middlewares/authorization/auth.js";
import {sendComment,deleteComment} from "../controllers/comment.js"

const router = express.Router();

router.post("/", getAccessToRoute, sendComment);

router.delete("/:id", getAccessToRoute, getCommentOwnerAccess, deleteComment);

export default router;
