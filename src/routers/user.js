const express = require("express")
const { userAuth } = require("../middleware/auth");
const ConnectionReq = require("../models/connectionRequest");
const User = require("../models/user")

const userRouter = express.Router()


//get/user/pending/requests
userRouter.get("/user/pending/requests",userAuth,async(req,res)=>{
    
   try {
    const loggedInUser = req.user;
    const connectionReq = await ConnectionReq.find({
        toUserId : loggedInUser._id,
        status:"interested"
    }).populate("fromUserId","firstName lastname gender age photoURL")
    console.log(connectionReq)
    if(connectionReq.length === 0){
        return res.send("No pending requests")
    }
    const data = connectionReq.map((row)=>row.fromUserId
    );
    res.json({data})
   }catch(err){
     res.status(500).send("Error: "+err.message)
   }
})


//get all connection of user
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionReq = await ConnectionReq.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        })
        .populate("fromUserId", "firstName lastname gender age photoURL")
        .populate("toUserId", "firstName lastname gender age photoURL");

        const data = connectionReq.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ data });

    } catch (err) {
        console.error(err); // optional: better debugging
        res.json({ Error: "Internal Server Error" });
    }
});



//feed api
userRouter.get("/user/feed",userAuth,async(req,res)=>{

  try {
         let limit = parseInt(req.query.limit) || 10;

        const page = parseInt(req.query.page) || 1;
        const skip = (page-1)*limit;
        limit = limit > 50 ?50 : limit;
    const loggedInUser = req.user;
    const connectionReq =await ConnectionReq.find({
        $or:[
            {fromUserId:loggedInUser},
            {toUserId:loggedInUser}
        ]
    }).select("fromUserId toUserId");
    // res.send(connectionReq)

    const hiddenUserFromFeed = new Set();
    connectionReq.forEach((req)=>{
        hiddenUserFromFeed.add(req.fromUserId.toString());
        hiddenUserFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
        $and:[
            {_id: {$nin : Array.from(hiddenUserFromFeed)} },
            {_id: {$ne : loggedInUser._id}}
        ]
    }).select("firstName lastname gender age photoURL ").skip(skip).limit(limit)
    if(users.length === 0){
        res.send("no new users found")
    }
     res.send(users)
}catch(err){
    res.status(400).send("Error: "+err.message)
}


})
module.exports = userRouter