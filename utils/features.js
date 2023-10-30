import jwt from "jsonwebtoken"


export const sendCookie = async(user,res,message,statusCode = 200) =>{
    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRETKEY)

    
    res.status(statusCode).cookie("token",token,{httpOnly:true,maxAge:15*60*1000}).json({message})
}