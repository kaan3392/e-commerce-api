const router = require("express").Router();
const { register, login, logout, editDetails, forgotPassword, resetPassword } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.post("/register", register);

router.post("/login", login);

router.get("/logout",getAccessToRoute, logout);

router.put("/edit",getAccessToRoute, editDetails)

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword", resetPassword)

module.exports = router;