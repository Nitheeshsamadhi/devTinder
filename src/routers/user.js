const express = require("express")
const { userAuth } = require("../middleware/auth");
const ConnectionReq = require("../models/connectionRequest");
const { connection } = require("mongoose");
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
module.exports = userRouter