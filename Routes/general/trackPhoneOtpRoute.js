let express = require("express");
let trackPhoneOtpController = require("../../controller/general/trackPhoneOtpController");

let router = express.Router();

router.post("/", trackPhoneOtpController);

module.exports = router;