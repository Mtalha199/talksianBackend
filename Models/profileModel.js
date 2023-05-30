const mongoose=require('mongoose')

const profileSchema=new mongoose.Schema({
    id:{
        type:String
    },
    profileImage:{
        type:String
    }
})
const profile=mongoose.model("profile",profileSchema)
module.exports=profile;