const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId:{
      type:String,
      required:true
    },

    Address:{
        
            firstName: String,
            lastName: String,
            email: String,
            street: String,
            number: String,
            city: String,
            state: String,
            pincode: String,
            country: String,
          
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        image: {
            type: String,
        },
        productName: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    status:{
      type: String,
      enum: ["order Placed", "Food is under Processing", "food Deliverd"],
      default: "order Placed",
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

Order = mongoose.model("Order", OrderSchema,);
module.exports=Order
