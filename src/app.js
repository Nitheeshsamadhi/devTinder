const express = require ("express");
const app = express();


app.use("/hello/add",(req,res)=>{
    
    res.send("hello world");
    
});

app.use("/hello",(req,res)=>{
    try {
        // throw new error("hajhddj")
        res.send("this is 2nd route");
    }catch(err){
        res.send("error")
    }
    
    
})


app.use('/',(err,req,res,next)=>{
    res.status(500).send("something went wrong")
})

app.listen(3000,()=>{
    console.log("app is running in port 3000")
})