import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
import userRouter from "./routes/user.Routes.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import listingRouter from "./routes/listing.route.js"

const __dirname = path.resolve();
dotenv.config();
//Allowing server to accept JSON
app.use(express.json());

//Enabeling Cors
app.use(
  cors({
    origin: "https://mern-estate-aayush.netlify.app/",
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
app.use('/api/listing', listingRouter);

// Serve static files

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
//Server Starting
app.listen(3000, (req, res) => {
  console.log("server listning on port 3000");
});
