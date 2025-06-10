const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express()
const {validationSignupData} = require("./utils/validations")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const user = require("./models/user")
const { ProfilingLevel } = require("mongodb")
const {userAuth} = require("./middleware/auth")

app.use(express.json())
app.use(cookieParser())


app.post("/login",async(req,res)=>{
    const {email,password} = req.body
    
    try{
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



//signup api
app.post("/signup",async (req,res)=>{
    console.log(req.body)
   
    
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
    console.log("data added successfully")
    }catch(error){
        console.log("data not added",error.message)
        res.status(400).json({error:error.message})
    } 
}) 

//get user details by emailid
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId
    console.log(userEmail)
    try{
        const user =await User.find({emailId:userEmail})
        if(user==0){
            res.status(400).send("user not found")
        }else{
            res.send(user)
        }
        
    }catch(error){
        res.status(400).send("Something went wrong: "+error.message)
    }
})


//feed api to get all users details
app.get("/feed",userAuth, async (req,res)=>{
    const user = await User.find({})
    try{
        res.send(user)
    }catch (error){
        res.status(400).send("something went wrong: "+error.message)
    }
    
})


//delete api by using user id
app.delete("/user",async(req,res)=>{
    try{
    const userEmail = req.body.userId
    console.log(userEmail)
    const user = await User.findByIdAndDelete({_id:userEmail})
    
    if(!user){
        res.send("user not found ")
    }
        res.json("user deleted successfully")
    }catch(error){
        res.send("no user found")
    }
})


//patch api to update a field by using user id
app.patch("/user/:userId",async(req,res) =>{
    const userId = req.params?.userId;
    const data = req.body
    try{
        const allowed_updates = ["firstName","lastname","password","gender","age"]

        const isupdates_allowed = Object.keys(data).every((k)=>
        allowed_updates.includes(k)
        );
        if(!isupdates_allowed){
            throw new Error("update not allowed"+error.message)
        }
        
        const user =await User.findByIdAndUpdate(userId,data,{new:true,runValidators:true},
            )
        if(!user){
            res.send("Invalid user id")
        }else{
            res.send(user)
        }
    }
    
    catch(error){
        res.status(400).send("Something went wrong "+error.message)
    }
})

// get user profile
app.get("/userprofile",userAuth, async (req,res)=>{
    try{
      
       const user = res.user
            res.send(user)
    }
    catch(err){
        res.status(400).send("error: "+err.message)
    }
    
})

//connection request api
app.post("/connectReq",userAuth, async(req,res)=>{
    const user = res.user
    res.send(user.firstName +" sent connection request")

})

connectDB()
.then( () =>{
    console.log("connection established successfully")
    app.listen(3000,()=>{
        console.log("app is running on port number 3000")
    }) 
}
)
.catch((err) =>{
    console.error("connetion failed: "+err.message)
}
)





// password: Qep3Fg19eknKsWCy