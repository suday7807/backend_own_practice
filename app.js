import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {connectDB} from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";


const app = express();
config({
    path:"./data/config.env"
})
connectDB();
app.use(express.json());
app.use(cookieParser());



app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)







app.get("/",(req,res)=>{
    res.send("Money Boy Uday");
})


const PORT = process.env.PORT || 7000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})