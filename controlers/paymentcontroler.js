const Order = require("../models/Order.js");
const User = require("../models/User");
const crypto = require("crypto");
const multer=require('multer')
const { Cashfree } = require("cashfree-pg");
const dotenv = require("dotenv");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
  });
dotenv.config();
Cashfree.XClientId =process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SAND;

const orderPayment = async (req, res) => {
  try {
    const {
      totalAmount,
      number,
      email,
      name,
      customerId,
      merchantTransactionId,
    } = req.body;

    const request  = {
      order_id: merchantTransactionId ,
      order_amount: totalAmount ,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId ,
        customer_email: email ,
        customer_name: name ,
        customer_phone: number ,
      },
      
    };
   const response=await  Cashfree.PGCreateOrder("2023-08-01", request )
   if (response && response.data){
    console.log("Backend data:", response.data);
    return res.json({ success: true, data: response.data })
   } 
   else {
    return res.status(400).json({ success: false, message: "Failed to create order" });
  }
  
}catch (error) {
    console.error("Error setting up order request:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });


  }

};

const verifyPayment = async (req, res) => {
  const { orderId} = req.body;
  console.log("orderId",orderId)
  if (!orderId) {
      return res.status(400).json({ success: false, message: "orderId ID is required" });
  }

  try {
      
    let version = "2023-08-01"
   const response=await Cashfree.PGFetchOrder(version, orderId)

    const data=response.data
   if (data){
    console.log("Backend verifired:", data);
    return res.json({ success: true, data })
   } 
   else {
    return res.status(400).json({ success: false, message: "Failed to create order" });
  }

      
  } catch (error) {
      console.error("Error verifying payment:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { orderPayment,verifyPayment  };
