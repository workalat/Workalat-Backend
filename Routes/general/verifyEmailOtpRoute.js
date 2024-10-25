let express = require("express");
let verifyEmailOtpController = require("../../controller/general/verifyEmailOtpController");

let router = express.Router();

router.post("/", verifyEmailOtpController);

module.exports = router; 