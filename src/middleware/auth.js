

const adminAuth = (req,res,next)=>{
    const valid = "xyz";
    const validation = valid === "xyz";
    if(!validation){
        res.send("invalid credentials")
    }
    else{
        next()
    }
    
    
};
const userAuth = (req,res,next)=>{
    const token = "user";
    const istoken = token === "use";
    if(!istoken){
        res.status(401).send("user details are invalid")
    }else{
        next()
    }
    
}

module.exports = {
    adminAuth,
    userAuth,
}
    
