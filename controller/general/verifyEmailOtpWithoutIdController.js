let OtpVerificationData = require("../../models/OtpVerification");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let bcrypt = require("bcryptjs");

async function verifyEmailOtpController(req, res) {
  try {
    let verificationId = req.body.verificationId;
    let otp = req.body.otp;
    let userType = req.body.userType;
    console.log(req.body);
    if (!verificationId || !otp) {
      throw Error("Invalid Details.");
    } else {
      let UserOtpVerificationRecodrs;

      if (userType === "client") {
        UserOtpVerificationRecodrs = await OtpVerificationData.find({
          _id: verificationId,
        }).sort({ createdAt: -1 });
      } else {
        UserOtpVerificationRecodrs = await OtpVerificationData.find({
          _id: verificationId,
        }).sort({ createdAt: -1 });
      }
      if (UserOtpVerificationRecodrs.length <= 0) {
        throw new Error("Please Resend OTP.");
      } else {
        let { expiredAt } = UserOtpVerificationRecodrs[0];
        let hashedOtp = UserOtpVerificationRecodrs[0].otp;

        if (expiredAt < Date.now()) {
          await OtpVerificationData.deleteMany({ _id: verificationId });
          throw new Error("OTP expired, please request a new OTP.");
        } else {
          let validOtp = await bcrypt.compare(`${otp}`, hashedOtp);
          console.log(validOtp);

          if (!validOtp) {
            throw new Error("Invalide OTP.");
          } else {
            let data;
            // console.log("reached");
            await OtpVerificationData.deleteOne({ _id: verificationId });
            res
              .status(200)
              .json({
                status: "success",
                userStatus: "VERIFIED",
                emailVerify: true,
                message: "Email verified.",
              });
          }
        }
      }
    }
  } catch (e) {
    console.log("Error while verifying Otp", e);
    res
      .status(400)
      .json({ status: "fail", userStatus: "FAILED", message: e.message });
  }
}

module.exports = verifyEmailOtpController;
