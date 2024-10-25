let express = require("express");
let signinGoogleController = require("../../controller/general/signinGoogleController");

let router = express.Router();

router.post("/", signinGoogleController);

module.exports = router;