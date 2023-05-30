const mongoose=require('mongoose')

const FRSchema=new mongoose.Schema(
    {
        senderName:{
            type:String
        },
        senderProfile:{
            type:String
        },
        senderId:{
            type:String
        },
        recieverId:{
            type:String
        },
        
    }
)

const FR=mongoose.model('friendRequest',FRSchema);
module.exports=FR;