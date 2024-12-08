import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRoute from "./Route/userRoute.js";
import auctionRoute from "./Route/auctionRoute.js";
import bidRoute from "./Route/bidRoute.js";
import commissionRoute from "./Route/commissionRoute.js";
import superAdminRoute from "./Route/superAdminRoute.js";
import { errorMiddleware } from "./Middleware/error.js";
import dbConnection from "./database/dbconnection.js";
import { endedAuctionCron } from "./automation/endedAuctionCorn.js";
import verifyCommissionCron from "./automation/verifyCommissionCorn.js";

dotenv.config();
// https://auction-portal-bamd.vercel.app
const app = express();
app.use(
  cors({
    origin: ["https://auction-portal-bamd.vercel.app"],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/user", userRoute);
app.use("/auctionitem", auctionRoute);
app.use("/bid", bidRoute);
app.use("/commission", commissionRoute);
app.use("/superadmin", superAdminRoute);

endedAuctionCron();
verifyCommissionCron();

dbConnection();
app.use(errorMiddleware);
export default app;
