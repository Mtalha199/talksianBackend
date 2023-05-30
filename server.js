const express=require('express');
const app=express();
const port=5000;
const fileUpload=require('express-fileupload')
app.use(express.json());
require('./DB/connection')
app.use(fileUpload({
    useTempFiles:true
}))
const cors=require('cors')

app.use(cors({

    origin:'*',
    methods:["POST","PUT","PATCH","GET"]
}))

app.use(require('./Routers/authentication'))
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})