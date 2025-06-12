const express = require("express")
const connectDB = require("./config/database")

const app = express()


const cookieParser = require("cookie-parser")

const Authrouter = require("./routers/auth")
const profilerouter = require("./routers/profile")
const requestRouter = require("./routers/connection")


app.use(express.json())
app.use(cookieParser())

app.use("/",Authrouter)
app.use("/",profilerouter)
app.use("/",requestRouter)


connectDB()
.then( () =>{
    console.log("connection established successfully")
    app.listen(3000,()=>{
        console.log("app is running on port number 3000")
    }) 
}
)
.catch((err) =>{
    console.error("connetion failed: "+err.message)
}
)





// password: Qep3Fg19eknKsWCy