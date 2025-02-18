const express=require('express')
const paymentRouter=express.Router()
const verifytoken=require('../middlewares/verifytoken')
const payment=require('../controlers/paymentcontroler')

paymentRouter.post('/pay',verifytoken,payment.orderPayment)
paymentRouter.post('/verify',verifytoken,payment.verifyPayment )

// paymentRouter.get('/uploads/:imageName', (req, res) => {   
//     const imageName = req.params.imageName;
//     res.header('Content-Type', 'image/jpeg');
//     res.sendFile(path.join(__dirname, '..', 'uploads', imageName));

// });
module.exports=paymentRouter