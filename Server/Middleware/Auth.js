import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "../Middleware/catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("User not Autheticate ", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);
  next();
});

export const isAuthorized = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role}Role is not allow`, 403));
    }
    next();
  };
};
