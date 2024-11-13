let express = require("express");
let sendEmailOtpWidController = require("../../controller/general/sendEmailOtpWidController");

let router = express.Router();

router.post("/", sendEmailOtpWidController);

module.exports = router;