const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const { ReturnDocument } = require("mongodb")
const app = express()

app.use(express.json())


//signup api
app.post("/signup",async (req,res)=>{
    console.log(req.body)
     const user = new User(req.body)
    //     firstName:"Vikranth",
    //     lastName:"yadav",
    //     email:"vikrnath@gmail.com",
    //     password:123454,

    // })
    try{
        await user.save()
    res.send("user added successfully")
    console.log("data added successfully")
    }catch(error){
        console.log("data not added")
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
        res.status(400).send("Something went wrong")
    }
})
//feed api to get all users details
app.get("/feed", async (req,res)=>{
    const user = await User.find({})
    try{
        res.send(user)
    }catch (error){
        res.status(400).send("something went wrong")
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

app.patch("/user",async(req,res) =>{
    const userId = req.body.userId
    const data = req.body
    try{
        
        const user =await User.findByIdAndUpdate(userId,data,{ReturnDocument:"before"})
        if(!user){
            res.send("Invalid user id")
        }else{
            res.send(user)
        }
    }
    
    catch(error){
        res.send("Something went wrong")
    }
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
    console.error("connetion failed")
}
)





// password: Qep3Fg19eknKsWCy