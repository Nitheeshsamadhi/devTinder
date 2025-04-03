const express = require("express");
const app = express();


app.use(
"/user",
(req,res,next)=>{
    console.log("this is first routing");
    next();
    res.send("this 1st routing");
    
},
(req,res,next)=>{
    console.log("this is second routing");
    next();
    res.send("this is 2nd routing");
    
},
(req,res,next)=>{
    console.log("this is third route")
    next()
    res.send("this is 3rd routing")
},
(req,res,next)=>{
    console.log("this is fourth routing");
    next()
    // res.send("this is 4th routing")
}
)

app.listen(3000,()=>{
    console.log("app listening on port number 3000")
})


