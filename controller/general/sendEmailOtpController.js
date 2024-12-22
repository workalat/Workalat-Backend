let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");
const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");

async function sendEmailOtpController(req, res){
    try{
        // let {userId,userEmail, type} = req.body;
        let userId = req.body.userId;
        let userEmail = req.body.userEmail;
        let userType = req.body.userType;
        if(userType  === "client"){
            let data = await ClientsData.findOne({clientEmail : userEmail}).select({clientEmail : 1});
            if(data !== null &&  data?._id != userId){
                throw new Error("This Email is already in use.")
            }
            else{
                await ClientsData.findOneAndUpdate({ _id: userId }, { clientEmail: userEmail }, { new: true });
                sendOtpVerificationEmail({_id: userId, email: userEmail,verificationType: "email" , userType: "client" ,verificationFor : "signup verification", type:"client"}, res);
            }
        }
        else{
            let data = await ProfessionalsData.findOne({professionalEmail : userEmail}).select({ professionalEmail :1});
            if(data !== null &&  data?._id != userId){
                throw new Error("This Email is already in use.")
            }
            else{
                await ProfessionalsData.findOneAndUpdate({ _id: userId }, { professionalEmail: userEmail }, { new: true });
                sendOtpVerificationEmail({_id: userId, email: userEmail,verificationType: "email" , userType: "client"  ,verificationFor : "signup verification", type:"professional"}, res);
            }
        } 
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = sendEmailOtpController;