const router = require("express").Router();
const { getAccessToRoute, getCommentOwnerAccess } = require("../middlewares/authorization/auth");
const {sendComment,deleteComment} = require("../controllers/comment")


router.post("/", getAccessToRoute, sendComment);

router.delete("/:id", getAccessToRoute, getCommentOwnerAccess, deleteComment);

module.exports = router;
