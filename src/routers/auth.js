const express = require("express")
const Authrouter = express.Router()
const jwt = require("jsonwebtoken")
const {validationSignupData} = require("../utils/validations")
const bcrypt = require("bcrypt")
const User = require("../models/user")




    //signup api
    Authrouter.post("/signup", async(req,res) =>{
        try{
            //singup data validation
            validationSignupData(req);
    
            const {firstName,lastname,emailId,phoneNumber,gender,about,photoURL,password} = req.body
        
            const hashedPassword = await bcrypt.hash(password,10)
            const user = new User({
                firstName,
                lastname,
                emailId,
                phoneNumber,
                gender,
                about,
                photoURL,
                password:hashedPassword
             })
            
            await user.save()
        res.send("user added successfully")
        console.log("user added successfully")
        }catch(error){
            console.log("data not added",error.message)
            res.status(400).json({error:error.message})
        } 
    })

    //login api
    Authrouter.post("/login",async (req,res)=>{

        try{
            const {email,password} = req.body
            const user =await User.findOne({emailId:email})
            
            
            if(!user){
                throw new Error("invalid crediential ")
            }
           
                const validPassword = await bcrypt.compare(password,user.password)
                
                if(validPassword){
                //creating token
                const token =await jwt.sign({_id:user._id},"NitheeshDev$90", { expiresIn: '48h' })
    
                //Inserting token into cookie
                res.cookie("token",token)
                    res.send("user login successfully")
                }else{
                    throw new Error("invalid credentials")
                }
            
        }
        catch(err){
            res.status(400).send("Error: " +err.message)
        }

    })

    Authrouter.post("/logout", (req,res)=>{
        res.cookie("token",null,{ expires :new Date(Date.now())})
        res.send("logout successfully!!!")
    })

module.exports=
    Authrouter

