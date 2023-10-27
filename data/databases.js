import mongoose from "mongoose";

const connectDB = () =>{
mongoose.connect(process.env.MONO_DB).then(()=>console.log("Database connected")).catch((e)=>console.log(e))
}

export default connectDB