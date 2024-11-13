let sendOTPVerificationEmailWithoutId = require("../../middleware/sendOTPVerificationEmailWithoutId");

async function sendEmailOtpWidController (req, res){
    try{
        // let {userId,userEmail, type} = req.body;
        let userEmail = req.body.userEmail;
        let userType = req.body.userType;
        if(userType  === "client"){
            sendOTPVerificationEmailWithoutId({email: userEmail,verificationType: "email" , userType: "client" ,verificationFor : "signup verification", type:"client"}, res);
        }
        else{
            sendOTPVerificationEmailWithoutId({email: userEmail,verificationType: "email" , userType: "professional"  ,verificationFor : "signup verification", type:"professional"}, res);
        } 
          
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = sendEmailOtpWidController ;