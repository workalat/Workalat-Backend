require("dotenv").config();
let mongoose = require("mongoose");


let OtpVerificationSchema  = new mongoose.Schema({
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


let OtpVerificationData =  new mongoose.model("OtpVerificationData", OtpVerificationSchema);

module.exports = OtpVerificationData;