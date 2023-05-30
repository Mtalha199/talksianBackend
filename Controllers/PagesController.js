const cloudinary = require("cloudinary");
require("../Cloudinary/cloudinaryConfig");
const Pages =require("../Models/pagesModel")

const createPage=async(req,res)=>{
    try
    {
          const {pagename}=req.body;

          const file = req.files.Image;
          const result = await cloudinary.uploader.upload(file.tempFilePath);
          const profileImageUrl = result.secure_url;

          const coverFile=req.files.coverImage;
          const coverResult=await cloudinary.uploader.upload(coverFile.tempFilePath);
          const coverImageUrl=coverResult.secure_url;


          if(!pagename)
          {
            res.status(401).send("Page Name is required")
          }
          else{
            const page=new Pages({
                pagename,
                profileImageUrl,
                coverImageUrl
              })
    
               await page.save()
               res.status(201).send("Page Created")
          }
         
    }catch(e)
    {
        res.status(404).send(e)
    }
  
}
const allPages=async(req,res)=>{
    try
    {
       const pages= await Pages.find()
       {
        res.status(201).send(pages)
       }
    }catch(e)
    {
        res.status(404).send(e)
    }
}
module.exports={
    createPage,
    allPages,
}