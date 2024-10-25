let OtpVerificationData = require("../../models/OtpVerification");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let bcrypt = require("bcryptjs");

async function verifyEmailOtpController(req, res) {
    try {
        let userId = req.body.userId;
        let otp = req.body.otp;
        let userType = req.body.userType;
        let type = req.body.type || "auth";
        console.log(req.body); 
        if (!userId || !otp) {
            throw Error("Empty otp details are not allowed");
        } 
        else {
            let UserOtpVerificationRecodrs;

            if (userType === "client") {
                UserOtpVerificationRecodrs = await OtpVerificationData.find({ userId }).sort({ createdAt: -1 });
            }
            else {
                UserOtpVerificationRecodrs = await OtpVerificationData.find({ userId }).sort({ createdAt: -1 });
            }
            if (UserOtpVerificationRecodrs.length <= 0) {
                throw new Error("Please login again or Resend OTP.")
            }
            else {
                let { expiredAt } = UserOtpVerificationRecodrs[0];
                let hashedOtp = UserOtpVerificationRecodrs[0].otp;

                if (expiredAt < Date.now()) {
                    await OtpVerificationData.deleteMany({ userId });
                    throw new Error("OTP has expired, please request new OTP.")
                }
                else {
                    // console.log("Comparing");
                    // console.log(otp, hashedOtp)
                    let validOtp = await bcrypt.compare(`${otp}`, hashedOtp);
                    console.log(validOtp)

                    if (!validOtp) {
                        throw new Error("Invalide OTP, Please enter correct OTP.");
                    }
                    else {
                        let data;
                        // console.log("reached");
                        if (userType === "client") {
                            data = await ClientsData.findOneAndUpdate({ _id: userId }, { isClientEmailVerify: true }, { new: true });
                            if(type === "auth"){
                                let token = await data.generateAuthToken();
                                await OtpVerificationData.deleteMany({ userId });
                                res.status(200).json({ status: "success", userStatus: "VERIFIED", emailVerify: data.isClientEmailVerify, message: "User Email verified successfully", token: token });
                            }
                            else{
                                await OtpVerificationData.deleteMany({ userId });
                                res.status(200).json({ status: "success", userStatus: "VERIFIED", emailVerify: data.isClientEmailVerify, message: "User Email verified successfully"});
                            }
                        }
                        else {
                            data = await ProfessionalsData.findOneAndUpdate({ _id: userId },{ isprofessionalEmailVerify: true }, { new: true });
                            // 
                            console.log("PRofessional", data);
                            if(type === "auth"){
                                 let token = await data.generateAuthToken();
                                await OtpVerificationData.deleteMany({ userId });
                                 res.status(200).json({ status: "success", userStatus: "VERIFIED", emailVerify:  data.isClientEmailVerify, message: "User Email verified successfully",token: token  });
                            }
                            else{
                                await OtpVerificationData.deleteMany({ userId });
                                 res.status(200).json({ status: "success", userStatus: "VERIFIED", emailVerify:  data.isClientEmailVerify, message: "User Email verified successfully" });

                            }
                        }
                    }
                }
            }
        }
    }
    catch (e) {
        console.log("Error while verifying Otp", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
}

module.exports = verifyEmailOtpController;