let OtpVerificationPhoneData = require("../../models/OtpVerificationPhone");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

let bcrypt = require("bcryptjs");

async function verifyPhoneOtpControllerWithoutId(req, res){
    try{
        let verificationId = req.body.verificationId;
        let otp = req.body.otp;
        let userType = req.body.userType;
        if(!verificationId || !otp){
            throw Error("Invalid Details.");
        }
        else{
            let UserOtpVerificationRecodrs;
            // console.log("Reched 1");
            
            if(userType === "client"){
                // console.log("Reched 3");
                 UserOtpVerificationRecodrs = await OtpVerificationPhoneData.find({_id : verificationId}).sort({createdAt : -1});
                 console.log("CLIENT OTP RECORD", UserOtpVerificationRecodrs);
            }
            else{
                // console.log("Reched 2");
                UserOtpVerificationRecodrs = await OtpVerificationPhoneData.find({_id : verificationId}).sort({createdAt : -1});
            }
            // console.log(UserOtpVerificationRecodrs)
            if(UserOtpVerificationRecodrs.length <=0){
                throw new Error("Please Resend OTP.")
            }
            else{
                let {expiredAt} = UserOtpVerificationRecodrs[0];
                let hashedOtp = UserOtpVerificationRecodrs[0].otp;
 
                if(expiredAt < Date.now()){
                    await OtpVerificationPhoneData.deleteOne({_id : verificationId});
                    throw new Error("OTP expired, please request a new OTP.")
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
                            // data = await ClientsData.findOneAndUpdate({_id: userId}, {isClientPhoneNoVerify : true},   { new: true });
                            // let token = await data.generateAuthToken();
                            
                            await OtpVerificationPhoneData.deleteOne({_id : verificationId});
                            //Yha pr ham token generate karenge or usko database mai save karenge
                            res.status(200).json({status : "success", userStatus : "VERIFIED" ,phoneVerify : true,message : "Phone Verified", userType : "client"});
                        }
                        else{
                            // data = await ProfessionalsData.findOneAndUpdate({_id: userId}, {isprofessionalPhoneNoVerify : true},   { new: true });
                            // let token = await data.generateAuthToken();
                            
                            await OtpVerificationPhoneData.deleteOne({_id : verificationId});
                            //Yha pr ham token generate karenge or usko database mai save karenge
                            res.status(200).json({status : "success", userStatus : "VERIFIED" ,phoneVerify : true,message : "Phone Verified", userType : "professional"});
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


module.exports = verifyPhoneOtpControllerWithoutId;