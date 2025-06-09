const mongoose = require("mongoose")
const validator = require("validator")
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true
    },
    lastname:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id: "+value)
            }
        }

        
    },
    password:{
        type:String,
        required:true,
        lowerCase:true,
        validate: {
            validator: function (value) {
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value);
            },
            message: "Password must be at least 8 characters long and include a capital letter, a lowercase letter, and a special character."
          }
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        // validate(value){
        //     if(!["male","female","other"].includes(value)){
        //         res.status(400).send("something went wrong"+error.message)
        //     }
                
        // }
        enum:["male","female","other"]
    },
    phoneNumber:{
        type:Number,
        unique:true,
        min:10,
        
    },
    about:{
        type:String,
        default:"this is devtinder for developers"
    },
    photoURL:{
        type:String,
        default:"https://media.licdn.com/dms/image/v2/D5603AQGGRhuBVWABHg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1716196446849?e=2147483647&v=beta&t=c17ZWTvv2xdLzO0qcLRaFm6lR48gNL3_ZO8qqlEFssQ",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("this is not a valid url")
            }
        }   
    }


},
{
    timestamps:true
}
)
module.exports = mongoose.model("User",UserSchema)