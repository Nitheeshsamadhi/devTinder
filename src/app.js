const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express()

app.use(express.json())



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

app.get("/feed", async (req,res)=>{
    const user = await User.find({})
    try{
        res.send(user)
    }catch (error){
        res.status(400).send("something went wrong")
    }
    
})
app.get("/oneuser",async(req,res)=>{
    const userEmail = req.body.emailId
    console.log(userEmail)
    const user = await User.findOne({emailId:userEmail})
    try{
        res.send(user)
    }catch(error){
        res.send("no user found")
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