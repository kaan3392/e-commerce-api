const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenhelpers");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/User");

const getAccessToRoute = (req, res, next) => {
  if (!isTokenIncluded(req)) {
    return next(new CustomError("You re not authorization to this route", 401));
  }

  const accessToken = getAccessTokenFromHeader(req);

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError("You are not authorization to access this route", 401)
      );
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (user.isAdmin) {
    return next(new CustomError("Only admins can access this route", 403));
  }
  next();
});

const getOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const paramsId = req.params.id;

  const user = await User.findById(paramsId);

  if (user._id.toString() !== userId) {
    return next(new CustomError("Only owner can access this route", 403));
  }

  next();
});

const getCommentOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const commentId = req.params.answer_id;

  const comment = await Comment.findById(commentId);

  if (comment.sender.toString() !== userId) {
    return next(new CustomError("Only owner can access this route", 403));
  }

  next();
});

module.exports = {
  getAccessToRoute,
  getAdminAccess,
  getOwnerAccess,
  getCommentOwnerAccess
};
