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



const validateProfileEditData = (req) => {
    const allowedFields = ['firstName', 'lastname', 'gender', 'age', 'profileURL'];
    const isValid = Object.keys(req.body).every((key) => allowedFields.includes(key));
    return isValid;
};

module.exports= {
    validationSignupData,
    validateProfileEditData
    }
