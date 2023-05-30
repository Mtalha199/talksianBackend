const User=require("../Models/userModel")
const FR=require("../Models/friendReqModel");
const mongoose=require('mongoose')
const friends=async(req,res)=>{
    try{
        const _id=req.params.id;
        const userExist=await User.findById({_id:_id})
        
        if(!userExist)
        {
            res.status(404).send("User Not  Found")

        }
        const friendsIds=userExist.friends;
        const friendObjectIds=friendsIds.map(friendId=>mongoose.Types.ObjectId.createFromHexString(friendId));
        console.log(friendObjectIds)
       const allUsers= await User.find(
            {_id:{
                $ne:_id,
                $nin:friendObjectIds
            }
                }
        )
        // console.log(allUsers)

        res.status(201).send(allUsers)

    }
    catch(e)
    {
        res.status(404).send("Catch Error from friends")
    }

    
}

const sendFriendRequest=async(req,res)=>{
    try{
        // console.log(req.body)
        const {senderName,senderProfile,senderId,recieverId}=req.body;


      const friendExist= await FR.findOne({senderId,recieverId})
      console.log("checkFriend",friendExist)
      if(!friendExist)
      {
        const friendRquest=new FR({
            senderName,
            senderProfile,
            senderId,
            recieverId
        })
        await friendRquest.save();
        res.status(200).send("Request Send")
       
      }
      else{
        res.status(201).send("You already sended")
      }

       
    }
    catch(e)
    {
        res.status(404).send("Catch Error from friends")

    }
   

}


const showRequestedData=async(req,res)=>{
    const _id=req.params.id;
    // console.log(_id)
      const appearData= await FR.find({recieverId:_id})
    //   console.log(appearData)
      if(!appearData)
      {
        res.status(204).send("No request Pending")
      }
      res.status(201).send(appearData)
}

const responseRequest=async(req,res)=>{
    try{

        console.log(req.body)
        const {objectId,senderId,recieverId}=req.body;
        console.log(objectId)
        const newSenderID=[senderId]
        const newRecieverID=[recieverId]
        const recieverfriend=await User.findOneAndUpdate(
            {_id:recieverId},
            {$addToSet:{friends:newSenderID}},
            {new:true,multi:true}
        )
        if(!recieverfriend)
        {
            res.status(400).send("NOT updated")
        }

        const senderfriend=await User.findOneAndUpdate(
            {_id:senderId},
            {$addToSet:{friends:newRecieverID}},
            {new:true,multi:true}
        )
        if(!senderfriend)
        {
            res.status(404).send("NOt Sender Friend")
        }
        const delFriendReq=await FR.deleteOne({_id:objectId})
        console.log(delFriendReq)
        if(!delFriendReq)
        {
            res.status(404).send("Not user Found")
        }
        res.status(200).send(
            {senderfriend,
            recieverfriend,
        delFriendReq})
    }
    catch(e)
    {
        res.status(401).send(e)
    }
}
       const allFriends=async(req,res)=>
       {
        try
        {
            const _id=req.params.id;
            // console.log(_id)
            const dataExist=await User.findOne({_id:_id});
            // console.log(dataExist)
             const friends= dataExist.friends;
                if(friends.length>0)
                {
                    const friendIds= friends.map(friendId=>mongoose.Types.ObjectId.createFromHexString(friendId))
                    console.log(friendIds)
                    const friendData = await User.find({ _id: { $in: friendIds } });
                    res.status(201).send(friendData)
                }
            
            else
            {
                res.status(404).send("No friends in your Friend list")
            }

        }catch(e)
        {
            res.status(404).send(e)
        }

        
    }


module.exports={
    friends,
    sendFriendRequest,
    showRequestedData,
    responseRequest,
    allFriends,
}