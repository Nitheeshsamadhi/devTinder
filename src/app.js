const express = require("express")
const connectDB = require("./config/database")
const app = express()

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