const express=require('express')
const verifyToken = require('../middlewares/verifytoken')
const cartControler= require('../controlers/cartControler')

const cartRouter=express.Router()


cartRouter.post('/add',verifyToken,cartControler.addItemToCart)
cartRouter.post('/remove',verifyToken,cartControler.removeItemFromCart)
cartRouter.get('/get',verifyToken,cartControler.getCartData)


module.exports=cartRouter