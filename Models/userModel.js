const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    aridno:{
        type:String,
        requierd:true
    },
    name:{
        type:String,
        requierd:true
    },

    cnic:{
        type:Number,
        requierd:true
    },
    fathername:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requierd:true
    },
    password:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    coverImageUrl:{
        type:String
    },
    friends:{
        type: [String],
        default: [],
    },
    isAdmin:{
        type:String
    }
})
const User= mongoose.model('signup',userschema)
module.exports=User;