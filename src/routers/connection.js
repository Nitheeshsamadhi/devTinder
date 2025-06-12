const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require("../middleware/auth")
//connection request api
requestRouter.post("/connectReq",userAuth, async(req,res)=>{
    const user = res.user
    res.send(user.firstName +" sent connection request")

});
module.exports=requestRouter