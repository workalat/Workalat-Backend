let express = require("express");
let signupClientEmailSendController = require("../../controller/client/signupClientEmailSendController");

let router = express.Router();

router.post("/", signupClientEmailSendController);

module.exports = router;