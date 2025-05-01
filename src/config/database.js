const mongoose = require("mongoose")

const connectDB = async() =>{
 await mongoose.connect
 ("mongodb+srv://nitheeshyv90:Qep3Fg19eknKsWCy@cluster0.bvgl2t9.mongodb.net/")
}

module.exports= connectDB