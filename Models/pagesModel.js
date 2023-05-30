const mongoose = require('mongoose')

const pagesSchema=new mongoose.Schema({
    pagename:{
        type:String
    },
    profileImageUrl:{
        type:String

    },
    coverImageUrl:{
        type:String
    }
})
const Pages=mongoose.model('page',pagesSchema)
module.exports=Pages;