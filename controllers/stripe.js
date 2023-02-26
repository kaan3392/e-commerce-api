const CustomError = require("../helpers/error/CustomError");
const dotenv = require("dotenv").config();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe").Stripe(KEY);

const payment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        return next(new CustomError(stripeErr, 500));
      } else {
        return res.status(200).json({success:true, data:stripeRes});
      }
    }
  );
};

module.exports = payment;
