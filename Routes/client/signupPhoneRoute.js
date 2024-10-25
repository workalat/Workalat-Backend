let express = require("express");
let signupPhoneController = require("../../controller/client/signupPhoneController");

let router = express.Router();

router.post("/", signupPhoneController);

module.exports = router;