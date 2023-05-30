const mongoose = require('mongoose')

const otpModel=new mongoose.Schema({
    email:{
        type:String,
        requierd:true
    },
    otp:{
        type:Number,
        required:true
    }
})

const oTp=mongoose.model('otp',otpModel)
module.exports=oTp;