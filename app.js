import express from "express";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import connectDB from "./data/databases.js";
import { config } from "dotenv";
import router from "./routes/user.js";

config({
  path: "./data/config.env",
});

connectDB();
const app = express();
app.use("users/",userRouter);
app.use(express.json());

router.get("/", (req, res) => {
  res.send("Hello Money Boy Uday🤑💲💰");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
