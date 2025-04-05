const express = require("express");
const app = express();

const {adminAuth,userAuth} = require("./middleware/auth")

app.use("/admin",adminAuth);

app.use("/admin/add",(req,res)=>{
    res.send("data added successfully");
});
app.use("/admin/delete",(req,res)=>{
    res.send("data deleted successfully");
});
app.use("/admin/update",(req,res)=>{
    res.send("data updated successfully")
})

app.use("/user",userAuth);

app.use("/user/add",(req,res)=>{
    res.send("user added successfully")
})
app.listen(3000,()=>{
    console.log("app is running on port number 3000")
})