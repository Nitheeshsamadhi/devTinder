const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../middleware/auth")
const {validateProfileEditData} = require("../utils/validations")
const bcrypt = require("bcrypt")
// get user profile
profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try{
      
       const user = res.user
            res.send(user)
    }
    catch(err){
        res.status(400).send("error: "+err.message)
    }
    
})

//profile edit
profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
    try{
        const user = res.user
        validateProfileEditData(req)
        if(!validateProfileEditData){
            throw new Error("can`t update data")
        }
        const {firstName,lastname,gender,age,profileURL} = req.body
        user.firstName = firstName
        user.lastname = lastname ;
        user.gender = gender;
        user.age = age;
        user.profileURL = profileURL;

        await user.save();
        res.status(200).send({message:"Profile updated successfully",user})
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }

})

profileRouter.post("/profile/password",userAuth,async(req,res)=>{
    try{
        const user = res.user;
        const {oldPassword,newPassword} = req.body;
        const isvalid =await bcrypt.compare(oldPassword,user.password)
        if(!isvalid){
            throw new Error("Please enter correct password")
        }
        const hashedPassword =await bcrypt.hash(newPassword,10)
        user.password = hashedPassword;
        await user.save()
        res.send("password updated successfully")
    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
    


})


module.exports=profileRouter