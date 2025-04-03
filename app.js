const express = require("express");
const app = express();



app.use("/home",(req,res)=>{
    res.send("this is home page");
     
})

app.get("/user",(req,res)=>{
    res.send({"name":"nitheesh","age":21})
})

app.post("/user",(req,res)=>{
    res.send("data sended to the database successfully")
})

app.delete("/user",(req,res)=>{
    res.send("data deleted successfully")
})

app.put("/user",(req,res)=>{
    res.send("data updated successfully")
})

app.patch("/user",(req,res)=>{
    res.send("data patched successfully")
})

app.listen(3000,()=>{
    console.log("app listening on port number 3000")
})


