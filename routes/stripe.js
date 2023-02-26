const payment = require("../controllers/stripe");
const router = require("express").Router();

router.post("/payment", payment);

module.exports = router;
