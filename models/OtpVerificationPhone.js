require("dotenv").config();
let mongoose = require("mongoose");


let OtpVerificationPhoneSchema  = new mongoose.Schema({
        userId : {
            type : String
        },
        otp : {
            type : String
        },
        verificationType : { //Email / Phone
            type : String
        },
        verificationFor : {  // Login / Project / Change 
            type : String
        },  
        createdAt: {
            type : Date
        },
        expiredAt : {
            type : Date
        }

})


let OtpVerificationPhoneData =  new mongoose.model("OtpVerificationPhoneData", OtpVerificationPhoneSchema);

module.exports = OtpVerificationPhoneData;