import mongoose from "mongoose"

const Schema = mongoose.Schema({
    name:String,
    email: String,
})

const User = mongoose.model("User",Schema)

export default User;