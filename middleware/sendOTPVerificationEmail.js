let nodemailer = require("nodemailer");
let bcrypt = require("bcryptjs");
let OtpVerificationData = require("../models/OtpVerification");
const ClientsData = require("../models/Client");
const ProfessionalsData = require("../models/Professional");

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
        console.log("Nodemailer is all set to send the emails");
    }
});

//Nodemailer Email OTP Sending Function
async function sendOtpVerificationEmail({_id, email, userType,verificationType, verificationFor, accountCreation}, res){
    try{
        console.log("Called otp function");
        console.log(process.env.USER);
        let otp = `${Math.floor(1000+Math.random()*9000)}`;
        console.log(otp);
 
        //Mail Option
        let mailOption={
            from : process.env.USER,
            to : email,
            subject : "Verify your WorkAlot Account with your Email",
            html: `<p>Your one time password (OTP) is ${otp}, please enter this to verify your account. <br />  This code will expire in 1 hour. </p>`
        }

        //hash the otp
        let hashedOtp = await bcrypt.hash(otp, 10);
        console.log(hashedOtp)
        let newOtpVerification = await new OtpVerificationData({
            userId: _id,
            otp: hashedOtp,
            verificationType : verificationType,
            verificationFor : verificationFor,
            createdAt: Date.now(),
            expiredAt : Date.now()+ 5 * 60 * 1000

        });
        console.log(newOtpVerification);
        await newOtpVerification.save();
        await transporter.sendMail(mailOption);
        res.status(200).json({
            status: "success",
            userStatus : "PENDING",
            message : "OTP Sent on your Email.",
            emailVerified : false,
            data: [{
                userId : _id,
                userType: userType,
                email
            }]
        })
    }
    catch(e){
        console.log("Error while sending Email for OTP verification", e);

        if(accountCreation === true || accountCreation){
            if(userType === "client"){
                let deleteUser  = await ClientsData.deleteOne({_id : _id});
                e.message = "The server is busy, Please Try Again in a few minutes";
            }
            else{
                let deleteUser  = await ProfessionalsData.deleteOne({_id : _id});
                e.message = "The server is busy, Please Try Again in a few minutes";
            }
        }

        res.status(400).json({
            status : "FAILED",
            message : e.message,
            errorKey : e.key,
            data : [{
                userId : _id,
                userType: userType,
                email : email
            }]
        })
    }
};

module.exports = sendOtpVerificationEmail;