let OtpVerificationPhoneData = require("../../models/OtpVerificationPhone");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

let bcrypt = require("bcryptjs");

async function verifyPhoneOtpController(req, res){
    try{
        let userId = req.body.userId;
        let otp = req.body.otp;
        let userType = req.body.userType;
        console.log(req.body);
        if(!userId || !otp){
            throw Error("Empty otp details are not allowed");
        }
        else{
            let UserOtpVerificationRecodrs;
            // console.log("Reched 1");
            
            if(userType === "client"){
                // console.log("Reched 3");
                 UserOtpVerificationRecodrs = await OtpVerificationPhoneData.find({userId}).sort({createdAt : -1});
            }
            else{
                // console.log("Reched 2");
                UserOtpVerificationRecodrs = await OtpVerificationPhoneData.find({userId}).sort({createdAt : -1});
            }
            // console.log(UserOtpVerificationRecodrs)
            if(UserOtpVerificationRecodrs.length <=0){
                throw new Error("Please login again or Resend OTP.")
            }
            else{
                let {expiredAt} = UserOtpVerificationRecodrs[0];
                let hashedOtp = UserOtpVerificationRecodrs[0].otp;
 
                if(expiredAt < Date.now()){
                    await OtpVerificationPhoneData.deleteMany({userId});
                    throw new Error("OTP has expired, please request again.")
                }
                else{
                    console.log("Comparing");
                    // console.log(otp, hashedOtp)
                    let validOtp = await bcrypt.compare(`${otp}`, hashedOtp);
                    // console.log(validOtp)
 
                    if(!validOtp){
                        throw new Error("Invalid OTP");
                    }
                    else{
                        let data;
                        console.log("reached");
                        if(userType === "client"){
                            data = await ClientsData.findOneAndUpdate({_id: userId}, {isClientPhoneNoVerify : true},   { new: true });
                            let token = await data.generateAuthToken();
                            
                            await OtpVerificationPhoneData.deleteMany({userId});
                            //Yha pr ham token generate karenge or usko database mai save karenge
                            res.status(200).json({status : "success", userStatus : "VERIFIED" ,phoneVerify : data.isClientPhoneNoVerify ,message : "User Phone no verified successfully",userId : data._id , userType : "client" ,token: token});
                        }
                        else{
                            data = await ProfessionalsData.findOneAndUpdate({_id: userId}, {isprofessionalPhoneNoVerify : true},   { new: true });
                            let token = await data.generateAuthToken();
                            
                            await OtpVerificationPhoneData.deleteMany({userId});
                            //Yha pr ham token generate karenge or usko database mai save karenge
                            res.status(200).json({status : "success", userStatus : "VERIFIED" ,phoneVerify : data.isprofessionalPhoneNoVerify ,message : "User Phone no verified successfully",userId : data._id , userType : "professional",token: token});
                        }
                    }
                }
            }
        }
    }
    catch(e){
        console.log("Error while verifying Otp", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
}


module.exports = verifyPhoneOtpController;