let express = require("express");
let signinEmailController = require("../../controller/general/signinEmailController");

let router = express.Router();

router.post("/", signinEmailController);

module.exports = router; 