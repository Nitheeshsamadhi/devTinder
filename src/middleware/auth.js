const jwt = require("jsonwebtoken")
const User = require("../models/user")


const userAuth = async(req,res,next)=>{
    try{
        const {token} = req.cookies
        if(!token){
            res.send("invalid token")
        }
        const decodedToken = await jwt.verify(token,"NitheeshDev$90")
        const {_id} = decodedToken
        const user = await User.findById(_id)
        if(!user){
            throw new Error("user not found")
        }
        res.user = user
        next()

    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
}
module.exports={
    userAuth
}