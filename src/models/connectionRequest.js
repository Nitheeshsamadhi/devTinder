const mongoose = require("mongoose")
const connectionSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
         values:["interested","ignore","accepted","rejected"] ,
         message:"{VALUE} is not supported"  
        }
    },
    
    
},
{
    timestamps:true
})
connectionSchema.index({ fromUserId: 1, toUserId: 1 })
const ConnectionReq = mongoose.model("connectionReq",connectionSchema)
module.exports=ConnectionReq
