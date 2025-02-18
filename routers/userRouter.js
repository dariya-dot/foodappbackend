const express= require('express')
const userRouter =express.Router()
const userControler=require('../controlers/userControler')


userRouter.post('/register',userControler.registerUser)
userRouter.post('/login',userControler.loginUser)
userRouter.get('/get/:userdId',userControler.getUserById)
userRouter.post('/otp',userControler.otpAthentication)
userRouter.post('/reset-password',userControler.forgetPassword)
userRouter.post('/new-password/:token',userControler.resetNewPassword)
module.exports= userRouter