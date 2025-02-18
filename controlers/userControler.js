const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const dotenv = require("dotenv");
const crypto=require('crypto')
dotenv.config();
const secretKey = process.env.KEY;
const {otpSendfunction,resetEmailSendfunction}=require('../emails/email')




const createtoken = (Id) => {
  return jwt.sign({ Id }, secretKey, { expiresIn: "30m" });
};
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "user alredy existed" });
    } else if (!validator.isEmail(email)) {
      return res.status(401).json({ message: "Please Enter the valid email" });
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        userName,
        email,
        password: hasedPassword,
        otp,
      });
      await newUser.save();
      otpSendfunction(newUser)
      const userId = newUser._id;
      console.log("registration sucess", newUser);
      res
        .status(201)
        .json({
          message: "user resister sussfully",
          userId,
          userData: newUser,
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Internal server error" });
  }
};

const otpAthentication = async (req, res) => {
  const { email, otp } = req.body;
 
  try {
    const user = await User.findOne({ email });
   
    if (!user.email) {
     
      return res
        .status(401)
        .json({ message: "user not found in otpAthentication in backend" });
    } else if (user.otp !== otp) {
      console.log("otp not matched")
        return  res.status(400).json({ message: "you entered wrong otp" });
       
    } else  {
      user.otp = "";
      user.isVerified = true;
      await user.save()
      console.log(user)
     return res
        .status(201)
        .json({ message: "user authenticated sussfully",  user });
    }
  } catch (error) {
    console.error(error);
  }
};


const forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
   
 
    if (!user) {
     console.log(user)
      return res
        .status(401)
        .json({ message: "user not fount with this email" });
    } else  {
      const resetToken= crypto.randomBytes(20).toString('hex')
      const resetTokenExpiresAt= Date.now()+1*30*60*1000; // 30 minutes
     
      user.resetPasswordToken=resetToken
      user.resetPasswordExpiresAt=resetTokenExpiresAt

      await user.save()
      resetEmailSendfunction(user,`${process.env.USR_URL}new-password/${resetToken}`)

        return res
        .status(201)
        .json({ message: "reset link sent ",  user,resetToken });
       
    } 
     
    
  } catch (error) {
    console.error(error);
  }
};


const resetNewPassword =async(req,res)=>{
  const {token}=req.body
  const {password}=req.body
  console.log(token,password)
  try {
    const user= await User.findOne({
      resetPasswordToken:token
    })
    if(!user){
      return res.status(400).json({message:"user not found"})
    }else{
      const hashedPassword= await bcrypt.hash(password,10)
      user.password=hashedPassword
       user.resetPasswordToken=""
       user.resetTokenExpiresAt= ""
     
      await user.save()
      return res.status(201).json({ message: "password updated", user })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"server error"})
  }
}



const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email is not registered" });
    } else if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Email and password are incorrect" });
    } 
    else if( user && !user.isVerified ){
      await user.deleteOne({email})
      return res.status(403).json({ message: "Your account was not verified and has been removed. Please register again." });
    }
    else  {
      const token = createtoken(user._id);
      const userId = user._id;
      const userName = user.userName;
      console.log("Jwt token:", token, "userId:", userId, userName);
      res
        .status(201)
        .json({ message: "userlogin is sucessfull",user, userId, userName, token });
    }
  } catch (error) {
    console.error("loginerror", error);
  }
};

const getUserById = async (req, res) => {
  const UserId = req.params.userdId;
  try {
    const user = await User.findById(UserId);
    if (!user) {
      return res.status(404).json({ message: "vender not found" });
    }
    if (user) {
      const userdetails = user;
      res.status(200).json({ userdetails });
      console.log("userDetails from backend ", userdetails);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "serevr error" });
  }
};

module.exports = { registerUser, loginUser, getUserById, otpAthentication,forgetPassword,resetNewPassword };
