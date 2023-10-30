import mongoose from "mongoose"

const Schema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        
    },
    email:{
        required:true,
        type:String,
        unique: true
    },
    password:{
        required:true,
        type:String,
        select:false
    },
    createdAt: { type: Date, default: Date.now }
})
 
const User = mongoose.model("User", Schema )

export default User;