let sendOtpVerificationPhone = require("../../middleware/sendOtpVerificationPhone");
let ProfessionalsData = require("../../models/Professional");
async function sendPhoneOtpController(req, res){
    try{
        // let {userId,userEmail, type} = req.body;
        let userType = req.body.userType;
        let userId = req.body.userId;
        let phoneNo = req.body.phoneNo;
        let countryCode = req.body.countryCode;
        console.log(req.body);
        // let phone = countryCode+phoneNo;

        if(userType  === "client"){
            sendOtpVerificationPhone(userId, phoneNo, res)
        } 
        else{ 
            let data = await ProfessionalsData.findOne({_id : userId});
            if(data === null){
                throw new Error("Wrong credentials, please login again")
            }
            data.professionalPhoneNo = phoneNo;
            // data.professionalCountryCode = countryCode;
            await data.save();
            sendOtpVerificationPhone(userId, phoneNo, res)
        }
        
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = sendPhoneOtpController;