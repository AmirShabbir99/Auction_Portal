import { proofOfCommission } from "../Controller/commissionController.js";
import express from "express";
import { isAuthenticated, isAuthorized } from "../Middleware/Auth.js";
const router = express.Router();

router.post(
  "/proof",
  isAuthenticated,
  isAuthorized("Auctioneer"),
  proofOfCommission
);

export default router;
