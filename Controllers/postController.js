const post = require("../Models/postModel");
// const profile=require("../Models/profileModel")
const User = require("../Models/userModel");
const cloudinary = require("cloudinary");
const mongoose =require("mongoose")
require("../Cloudinary/cloudinaryConfig");

const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const { mindThoughts, id, name,like, comment } = req.body;
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    const imageUrl = result.secure_url;
    // console.log(imageUrl);
    if (!id) {
      res.status(406).send("Thought is Required");
    } else {
      const data = new post({
        mindThoughts,
        id,
        name,
        imageUrl,
        like,
        comment,
      });
      await data.save();
      res.status(200).send("Data Saved");
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const showData = async (req, res) => {
  try {
    const { id } = req.body;
    const allData = await post.find({ id: id });
    res.send(allData);
  } catch (e) {
    res.status(404).send(e);
  }
};

const deletePost = async (req, res) => {
  try {
    console.log(req.body)
    const { id } = req.body;
    await post.deleteOne({ _id: id });
    res.status(200).send("Deleted Post");
  } catch (e) {
    res.status(404).send(e);
  }
};

const profileImage = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id)
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const imageUrl = result.secure_url;
    const updatedProfile = await User.findOneAndUpdate(
      { _id: _id },
      [{ $set: { imageUrl: imageUrl } }],
      { new : true }
    );
    if (!updatedProfile) {
      res.status(404).send("user not founf");
    }
    res.status(200).send(updatedProfile);
  } catch (e) {
    res.status(406).send(e);
  }
};
const coverImage = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id)
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const imageUrl = result.secure_url;
    console.log(imageUrl)
    const updateCover=await User.findOneAndUpdate(
      {_id:_id},
      [{$set:{coverImageUrl:imageUrl}}],
      { new : true }
    );
    console.log(updateCover)
    if(!updateCover)
    {
     res.status(404).send("User not found")
    }

    res.status(200).send(updateCover)

  }


  catch (e) {
    res.status(406).send(e);
  }
};

const showPostsInDashboard=async(req,res)=>{
try{
  const _id=req.params.id;
 const userExist= await User.findOne({_id:_id});
 if(!userExist)
 {
  res.status(404).send("User Not found")
 }
 const friendsIds=userExist.friends;
const friendData=Promise.all( friendsIds.map(async(item)=>{
  const friendsPosts=await post.find({id:item })
  return friendsPosts
})).then((friendData) => {
  // console.log(friendData);
  const combinePosts=friendData.flat();
  // console.log(combinePosts)
  res.status(200).send(combinePosts);
})
.catch((error) => {
  console.error(error);
  res.status(500).send("Error fetching friend posts");
});


}catch(e)
{
  res.status(404).send(e)
}
 

}

const showProfileOnDashboardClick=async(req,res)=>{
  try
  {const _id=req.params.id;
    console.log(_id)
    const allData = await post.find({ id: _id });
    const userExist=await User.findById({_id:_id})
    console.log(userExist)
    userExist.imageUrl;
    userExist.coverImageUrl;
    // res.send(allData);

  }catch(e)
{
  res.status(404).send(e)
}
}
  
module.exports = {
  createPost,
  showData,
  deletePost,
  profileImage,
  coverImage,
  showPostsInDashboard,
  showProfileOnDashboardClick,
};
