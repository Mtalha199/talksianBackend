const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/Talksians",{
    family:4
}).then(()=>{
    console.log("Connected to DataBase")
}).catch((err)=>{
    console.log(err)
})