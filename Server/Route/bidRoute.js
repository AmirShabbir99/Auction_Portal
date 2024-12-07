import express from "express";
import { checkAuctionEndTime } from "../Middleware/checkAuctionEndTime.js";
import { placeBid } from "../Controller/bidController.js";
import { isAuthenticated, isAuthorized } from "../Middleware/auth.js";
const router = express.Router();

router.post(
  "/place/:id",
  isAuthenticated,
  isAuthorized("Bidder"),
  checkAuctionEndTime,
  placeBid
);

export default router;
