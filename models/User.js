const mongoose = require("mongoose");

const Order=require('../models/Order')
const userSchema =  mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], 
   
    
    otp: String,
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: {type:String, default:""},
    resetPasswordExpiresAt:{type:Date ,default:""}

  },
  { minimize: false }
);

 const User= mongoose.model("User", userSchema);

 module.exports =User