import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import path from "path";
import bodyParser from "body-parser";
import { stripeWebhook } from "./controllers/coursePurchase.controller.js";

dotenv.config({});

// call database connection here
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// for deployment
const _dirname = path.resolve();

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    // origin: "http://localhost:5173", // Set your frontend origin
    origin: "https://edunexa-70gn.onrender.com", // Set your frontend origin
    credentials: true, // Allow cookies and authentication headers
  })
);

// apis //act as a middleware
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
});

// "http://localhost:5173/api/v1/user/register"

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
