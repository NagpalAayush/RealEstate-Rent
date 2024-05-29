import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
import userRouter from "./routes/user.Routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();
//Allowing server to accept JSON
app.use(express.json());

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
  res.status(500).json(err.message)
});

//Server Starting
app.listen(3000, (req, res) => {
  console.log("server listning on port 3000");
});
