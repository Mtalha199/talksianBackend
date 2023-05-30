const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    mindThoughts:{
        type:String,
    },
    id:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    name:{
        type:String
    },
    like:{
        type:Number
    },
    comment:{
        type:Number
    }
})

const post=mongoose.model('post',postSchema);
module.exports=post;