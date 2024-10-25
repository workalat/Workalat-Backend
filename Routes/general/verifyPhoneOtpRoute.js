let express = require("express");
let verifyPhoneOtpController = require("../../controller/general/verifyPhoneOtpController");

let router = express.Router();

router.post("/", verifyPhoneOtpController);

module.exports = router; 