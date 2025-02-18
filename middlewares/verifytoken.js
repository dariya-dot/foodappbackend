const User=require('../models/User')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config()
const secretKey = process.env.KEY; // ✅ Correct spelling

const verifyToken=async(req,res,next)=>{
    const {token} = req.headers
    
    if(!token){
        return res.status(401).json({message:"Token is missing from the request "})}
    try {
       const decoded=jwt.verify(token,secretKey)
        console.log(decoded)
       
       const isUser= await User.findById(decoded.Id)
        console.log(isUser)
        if(!isUser){
            return res.json({message:"user not found"})
        }
        req.userId=isUser._id
        next()
    } catch (error) {
        console.log("middleware",error)
        return res.status(404).json({ message: "User ...... not found" });

    }
}



module.exports=verifyToken