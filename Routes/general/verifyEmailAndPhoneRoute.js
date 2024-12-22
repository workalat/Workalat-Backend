let express = require("express");
let verifyEmailAndPhoneController = require("../../controller/general/verifyEmailAndPhoneController");

let router = express.Router();

router.post("/", verifyEmailAndPhoneController);

module.exports = router;