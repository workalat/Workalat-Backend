let sendOtpVerificationPhoneWithoutId = require("../../middleware/sendOtpVerificationPhoneWithoutId");
let ProfessionalsData = require("../../models/Professional");
async function sendPhoneOtpWidController(req, res){
    try{
        // let {userId,userEmail, type} = req.body;
        // let userType = req.body.userType;
        // let userId = req.body.userId;
        let phoneNo = req.body.phoneNo;
        // let countryCode = req.body.countryCode;
        // let phone = countryCode+phoneNo;

        // if(userType  === "client"){
            sendOtpVerificationPhoneWithoutId(phoneNo, res)
        // } 
        // else{ 
            // let data = await ProfessionalsData.findOne({_id : userId});
            // if(data === null){
            //     throw new Error("Wrong credentials, please login again")
            // }
            // data.professionalPhoneNo = phoneNo;
            // // data.professionalCountryCode = countryCode;
            // await data.save();
            // sendOtpVerificationPhone(userId, phoneNo, res)
        // }
        
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = sendPhoneOtpWidController;