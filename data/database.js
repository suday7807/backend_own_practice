import mongoose from "mongoose";

const connectDB = ()=>{

mongoose.connect(process.env.MONGO_DB).then(()=>console.log("database connected")).catch((e)=>console.log(e))
}

export {connectDB};