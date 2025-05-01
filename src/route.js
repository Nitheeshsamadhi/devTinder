const express = require("express")
const app = express()

app.use("/first",(req,res,next)=>{
    res.send("this is first route")
    console.log("hello everyone")
})
app.listen(3000,()=>{
    console.log("app is running on port number 3000")
})

// password: Qep3Fg19eknKsWCy