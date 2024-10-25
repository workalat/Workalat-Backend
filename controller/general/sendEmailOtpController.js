let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");

async function sendEmailOtpController(req, res){
    try{
        // let {userId,userEmail, type} = req.body;
        let userId = req.body.userId;
        let userEmail = req.body.userEmail;
        let userType = req.body.userType;
        if(userType  === "client"){
            sendOtpVerificationEmail({_id: userId, email: userEmail,verificationType: "email" , userType: "client" ,verificationFor : "signup verification", type:"client"}, res);
        }
        else{
            sendOtpVerificationEmail({_id: userId, email: userEmail,verificationType: "email" , userType: "client"  ,verificationFor : "signup verification", type:"professional"}, res);
        } 
          
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = sendEmailOtpController;