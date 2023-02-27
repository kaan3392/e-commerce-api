import stripe from "stripe";
import dotenv from "dotenv";
import CustomError from "../helpers/error/CustomError.js";

dotenv.config();

const KEY = process.env.STRIPE_KEY;

const newStripe = stripe.Stripe(KEY);


const payment = (req, res) => {
  newStripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        return next(new CustomError(stripeErr, 500));
      } else {
        return res.status(200).json({ success: true, data: stripeRes });
      }
    }
  );
};

export default payment;
