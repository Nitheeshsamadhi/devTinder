const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require("../middleware/auth");
const ConnectionReq = require("../models/connectionRequest");
const User = require("../models/user")
//connection request api
requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
    try{
        const user = req.user;

        const fromUserId = user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        
        //validating if user is trying to send connection to himself
        if(fromUserId == toUserId){
            return res.status(400).send("You cann`t send connection to yourself")
        }
        //validating recever user in presented in our BD or not 
        const toUser =await User.findById(toUserId)
        if(!toUser){
            return res.status(400).send("Receiver not found");
        }
        //status validation
        const validStatus = ["interested","ignore"]
        if(!validStatus.includes(status)){
            res.status(400).send(`${status} is not a valid status`)
        }
        
        const existingConnectionRequest =await ConnectionReq.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(existingConnectionRequest){
            return res.status(400).send("connection request already sent")
        }

        const request = new ConnectionReq({
            fromUserId : fromUserId,
            toUserId : toUserId,
            status: status

        })
        await request.save();
        res.send(user.firstName+" send connection request to "+ toUser.firstName)
        
            
        

    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }


});

requestRouter.post("/request/review/:status/:requestId",userAuth, async(req,res)=>{
    try{
        const userId = req.user;
        const {status,requestId} = req.params

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.send("status invalid "+status)
        }

        const connectionReq = await ConnectionReq.findOne({
            _id : requestId,
            toUserId : userId,
            status:"interested"
        })

        if(!connectionReq){
            return res.send("No connection request found");
        }
        connectionReq.status = status;
        const data = await connectionReq.save();

        res.json({message:"connection request" +status,data})


    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
    
})

module.exports=requestRouter