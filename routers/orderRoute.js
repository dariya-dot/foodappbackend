const express=require('express')
const orderRouter=express.Router()
const verifytoken=require('../middlewares/verifytoken')
const orderControler=require('../controlers/orderControler')

orderRouter.post('/save',verifytoken,orderControler.placeOrder)
orderRouter.get('/:userId', verifytoken,orderControler.getOrderDetails);

orderRouter.get('/uploads/:imageName', (req, res) => {   
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));

});

module.exports=orderRouter