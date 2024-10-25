let express = require("express");
let sendOtpVerificationEmail = require("../../controller/general/sendEmailOtpController");

let router = express.Router();

router.post("/", sendOtpVerificationEmail);

module.exports = router;