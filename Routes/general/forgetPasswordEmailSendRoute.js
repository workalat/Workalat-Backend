let express = require("express");
let forgetPasswordEmailSendController = require("../../controller/general/forgetPasswordEmailSendController");

let router = express.Router();

router.post("/", forgetPasswordEmailSendController);

module.exports = router;