let nodemailer = require("nodemailer");
let bcrypt = require("bcryptjs");
let OtpVerificationPhoneData = require("../models/OtpVerificationPhone");
const twilio = require('twilio');


//SEND OTP VERIFICATION PHONE
let accountSid = process.env.TWILIO_SID;                  // Your Account SID from www.twilio.com/console
let authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

let transporter = nodemailer.createTransport({
    host : process.env.HOST,
    auth : { 
        user : process.env.USER,
        pass : process.env.PASS
    }
}); 
transporter.verify((e, success)=>{
    if(e){
        console.log("Nodemailer Error : "  ,e)
    }
    else{
        console.log("Twilio is all set to send the Phone Calls.");
    }
});

function formatOtpForReading(otp) {
    // Split the OTP into individual characters and join them with pauses or commas
    return otp.toString().split('').join(', ');
  }



async function sendOtpVerificationPhone(userId ,phoneNo, res){
    console.log(userId ,phoneNo);
    try{
        let otp = Math.floor(1000 + Math.random() * 9000);
        const formattedOtp = formatOtpForReading(otp);
        console.log("Formatted Otp: " + formattedOtp);
        client.calls
        .create({
            to: phoneNo,
            from: "+447458914253", // Your Twilio number
            twiml: `<Response><Say language="en-GB"><prosody rate="85%">Your verification code is ${formattedOtp}.             Again your verification code is ${formattedOtp}              .</prosody>        </Say></Response>`, // Message that will be read to the user
           
        })
        .then(call => console.log( "Call Sid" ,call.sid))
        .catch(error => console.error('Error making call:', error));

        console.log( typeof(otp), otp)
        let hashedOtp = await bcrypt.hash(`${otp}`, 10);
        // console.log(hashedOtp)
        
        let newOtpVerification = await new OtpVerificationPhoneData({
            userId: userId,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiredAt : Date.now()+ 5 * 60 * 1000
        });
        console.log(newOtpVerification); 
        await newOtpVerification.save();
        res.json({
            status : "success",
            userStatus : "PENDING",
            message : "You'll shortly recieve a call on Your Phone No, please verify Your OTP.",
            phoneVerified : false,
            data: {
                userId : userId,
                phone : phoneNo
            }
        })

    }
    catch(e){
        console.log("Error while sending Phone for OTP verification", e);
        res.status(400).json({
            status : "FAILED",
            message : e.message,
        })

    }
} 

module.exports = sendOtpVerificationPhone;