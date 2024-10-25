let express = require("express");
let sendPhoneOtpController = require("../../controller/general/sendPhoneOtpController");

let router = express.Router();

router.post("/", sendPhoneOtpController);

module.exports = router;