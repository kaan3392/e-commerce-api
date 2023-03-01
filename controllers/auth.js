import User from "../models/User.js";
import asyncErrorWrapper from "express-async-handler";
import { sendJwtToClient } from "../helpers/authorization/tokenHelpers.js";
import CustomError from "../helpers/error/CustomError.js";
import {
  validateUserInput,
  comparePassword,
} from "../helpers/input/inputHelpers.js";
import sendEmail from "../helpers/libs/sendEmail.js";

export const register = asyncErrorWrapper(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    isAdmin,
  });

  sendJwtToClient(user, res, 200);
});

export const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your input", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new CustomError("Please check your credentials", 400));
  }

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 400));
  }

  sendJwtToClient(user, res);
});

export const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

export const editDetails = asyncErrorWrapper(async (req, res, next) => {
  const editInformation = req.body;

  const { password, ...others } = editInformation;

  let user;
  if (editInformation.password) {
    user = await User.findOne({ _id: req.user.id });

    user.password = editInformation.password;

    await user.save();
  }
  if (others) {
    user = await User.findByIdAndUpdate(req.user.id, others, {
      new: true,
      runValidators: true,
    });
  }

  return res.status(200).json(user);
});

export const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
  const resetEmail = req.body.email;

  const user = await User.findOne({ email: resetEmail });

  if (!user) {
    return next(new CustomError("There is no user with that email", 400));
  }

  const resetPasswordToken = user.getResetPasswordTokenFromUser();

  await user.save();

  const resetPasswordUrl = `${process.env.API_URL}/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = `
  <h3>Reset Your Password</h3>
  <p>This <a href=${resetPasswordUrl} target="_blank"> link </a> will expire in 1 hour.</p>
  `;

  try {
    await sendEmail({
      from: process.env.SMTP_USER,
      to: resetEmail,
      subject: "Reset your password",
      html: emailTemplate,
    });

    return res.status(200).json({
      success: true,
      message: "Token sent to your email address",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new CustomError("Email could not be sent", 500));
  }
});

export const resetPassword = asyncErrorWrapper(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { password } = req.body;

  if (!resetPasswordToken) {
    return next(new CustomError("Please provide a valid token", 400));
  }

  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Invalid token or Session expired", 404));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Reset password process successfull",
  });
});
