const Order = require("../models/Order");
const multer=require('multer')
const User=require('../models/User')
// const { initiatePhonePePayment } = require("./paymentController");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
  });


const placeOrder = async (req, res) => {
  try {

    const { orderData,orderId,userId } = req.body;
    
const user = await User.findOne({userId})
    if (user) {
      const newOrder = new Order({
        userId:userId,
        orderId:orderId,
        Address:orderData.Address,
        items:orderData.order,
        totalAmount:orderData.totalAmount,
        payment:"Paid",
        status:"order Placed"
      });

      await newOrder.save();
      user.orders.push(newOrder._id);
      await user.save()
      res.json({ success: true, message: "Order placed successfully!" });
    } else {
      res.status(400).json({ success: false, message: "user not saved" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }


};

const getOrderDetails = async (req, res) => {
  try {
    const { userId } = req.params; 
    const user = await User.findById(userId).populate('orders'); 
    if (user) {
     
      res.json({ success: true, orders: user.orders });
    } else {
    
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { placeOrder ,getOrderDetails};



