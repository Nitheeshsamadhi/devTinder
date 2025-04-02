const express = require("express");
const app = express();

app.use("/hello",(req,res)=>{
    res.send("hello everyone ");
     
})

app.use("/home",(req,res)=>{
    res.send("this is home page");
     
})

app.listen(3000,()=>{
    console.log("app listening on port number 3000")
})