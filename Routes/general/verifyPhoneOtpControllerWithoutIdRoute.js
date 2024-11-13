let express = require("express");
let verifyPhoneOtpControllerWithoutId = require("../../controller/general/verifyPhoneOtpControllerWithoutId");

let router = express.Router();

router.post("/", verifyPhoneOtpControllerWithoutId);

module.exports = router; 