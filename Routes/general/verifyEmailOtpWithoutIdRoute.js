let express = require("express");
let verifyEmailOtpWithoutIdController = require("../../controller/general/verifyEmailOtpWithoutIdController");

let router = express.Router();

router.post("/", verifyEmailOtpWithoutIdController);

module.exports = router;