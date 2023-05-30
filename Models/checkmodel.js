const mongoose=require('mongoose')


const checkUserSchema=new mongoose.Schema({
    aridno:{
        type:String,
        required:true
    } ,
    name:{
        type:String,
        required:true
    },
    cnic:{
        type:Number,
        required:true
    }, 
    fathername:{
        type:String,
        required:true
    },
    isAdmin:{
        type:String
    }
})
    const checkUser= mongoose.model('admin',checkUserSchema)
    module.exports=checkUser;