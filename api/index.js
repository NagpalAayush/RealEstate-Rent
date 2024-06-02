import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
import userRouter from "./routes/user.Routes.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import ExpressError from "./utils/ExpressError.js";

dotenv.config();
//Allowing server to accept JSON
app.use(express.json());

//Enabeling Cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Retrieving Cookies
app.use(cookieParser());

// Connecting to DataBase
async function main() {
  await mongoose.connect(process.env.MONGO);
}

main()
  .then(() => {
    console.log("Connected to Database Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//Error Handeling
app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode || 500).json({
    success: false,
    message: message,
  });
});
//Server Starting
app.listen(3000, (req, res) => {
  console.log("server listning on port 3000");
});
