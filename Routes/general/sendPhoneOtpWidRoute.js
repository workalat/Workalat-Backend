let express = require("express");
let sendPhoneOtpWidController = require("../../controller/general/sendPhoneOtpWidController");

let router = express.Router();

router.post("/", sendPhoneOtpWidController);

module.exports = router;