
require('dotenv').config();
const nodemailer = require("nodemailer");

const PASS = process.env.EMAIL_PASS; 


const  resetEmailSendfunction = (user,resetLink) => {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
      secure: false,
      auth: {
        user: "nodemailer.dariya@gmail.com",
        pass:PASS
      },
    });
  
    var options = {
      from: "nodemailer.dariya@gmail.com",
      to: user.email,
      subject: "password reset email",
      html: `

      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; text-align: center;">
        <h2 style="color: #ff5722;">Password Reset Request</h2>
        <p>Hi ${user.userName},</p>
        <p>We received a request to reset your password for your FOOD APP account.</p>
        
        <h3>Click the button below to reset your password:</h3>
        <a href="${resetLink}" style="display: inline-block; background-color: #ff5722; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; margin: 10px 0;">
          Reset Password
        </a>
      
        <p>If the button doesn’t work, copy and paste the following link into your browser:</p>
        <p style="word-break: break-word;"><a href="${resetLink}">${resetLink}</a></p>
      
        <p>This reset link is valid for <strong>1 hour</strong>. If you didn’t request this, you can safely ignore this email.</p>
      
        <hr>
        <p style="color: #666; font-size: 12px;">For any queries, contact our support team at <a href="mailto:support@foodapp.com">support@foodapp.com</a></p>
      </div> `
      
    };
  
    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(" reset email  sent");
      }
    });
  };




 const  otpSendfunction = (user) => {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
      secure: false,
      auth: {
        user: "nodemailer.dariya@gmail.com",
        pass: PASS,
      },
    });
  
    var options = {
      from: "nodemailer.dariya@gmail.com",
      to: user.email,
      subject: "Your OTP for FOOD APP Registration",
      html:  `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; text-align: center;">
      <h2 style="color: #ff5722;">Welcome to FOOD APP, ${user.userName}!</h2>
      <p>We are excited to have you join us on our journey of delicious flavors and quick deliveries.</p>
      
      <h3>Your OTP for registration:</h3>
      <p style="font-size: 24px; font-weight: bold; color: #ff5722;">${user.otp}</p>
      
      <p>This OTP is valid for <strong>5 minutes</strong>. Please enter it on the FOOD APP website to complete your registration.</p>
      
      <hr>
      <h3>Why Choose FOOD APP?</h3>
      <ul style="list-style-type: none; padding: 0;">
          <li>🍕 Order from your favorite restaurants</li>
          <li>🚀 Superfast delivery</li>
          <li>💰 Exciting discounts & offers</li>
          <li>🥗 Fresh and hygienic food</li>
      </ul>
      
      <p>If you did not request this, please ignore this email.</p>
      
      <p style="color: #666; font-size: 12px;">For any queries, contact our support team at <a href="mailto:support@foodapp.com">support@foodapp.com</a></p>
    </div>`
    };
  
    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("email otp sent");
      }
    });
  };

  module.exports={resetEmailSendfunction,otpSendfunction}