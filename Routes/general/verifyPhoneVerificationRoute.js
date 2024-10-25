let express = require("express");
let verifyPhoneVerificationController = require("../../controller/general/verifyPhoneVerificationController");

let router = express.Router();

router.post("/", verifyPhoneVerificationController);

module.exports = router;