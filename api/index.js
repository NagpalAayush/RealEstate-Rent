import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
const app = express();
import userRouter from "./routes/user.Routes.js"

dotenv.config()


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


 app.use("/" , userRouter);

app.listen(3000, (req, res) => {
  console.log("server listning on port 3000");
});
