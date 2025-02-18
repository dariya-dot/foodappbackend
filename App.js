const dotenv=require('dotenv')
const express = require('express')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')
const path = require('path'); 
const cors= require('cors')
const userRouter  = require('./routers/userRouter')
const cartRouter = require('./routers/cartRoute')
const paymentRouter = require('./routers/paymentrouter')
const orderRouter = require('./routers/orderRoute')


app.use(express.json());
app.use(cors())
dotenv.config()
const PORT =process.env.PORT || 3002
app.use(bodyParser.json())
mongoose.connect(process.env.URI)
.then(()=>{console.log("the Mongoose connection is sucessful")})
.catch((error)=>{console.error(error)})
app.get('/',(req,res)=>{
    res.send("hello")
})

app.use(express.urlencoded({extended:true}))
app.use('/user',userRouter)
app.use('/cart',cartRouter)
app.use('/payment',paymentRouter)
app.use('/order',orderRouter)
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})