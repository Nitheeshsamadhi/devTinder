const validator = require("validator")

const validationSignupData = (req) =>{
    const {firstName,lastname,emailId,password} = req.body
    if(!firstName || !lastname){
        throw new Error("first and lastnames are required")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please enter a proper email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}
module.exports= {
    validationSignupData
    }
