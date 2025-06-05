const express = require("express")
const connect = require("./config/database")
const User = require("./models/user")
const app = express()


app.use(express.json());
app.post("/signup",async(req,res) =>{
    console.log(req.body)
    const user = new User(req.body)
   
    try{
        await user.save()
        res.send("user data successfully added")
        console.log("data entered successfully")
    }
    catch(err){
        res.status(400).send("data not entered successfully")
        console.log("Data not entered")
    }
   
    
})

connect()
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