import User from "../Model/userModel.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

export const trackCommissionStatus = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user.unpaidCommission > 0) {
      return next(new ErrorHandler("You have unpaid Commissions", 403));
    }
    next();
  }
);
