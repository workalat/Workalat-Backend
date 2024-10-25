let express = require("express");
let signupGoogleController = require("../../controller/general/signupGoogleController");

let router = express.Router();

router.post("/", signupGoogleController);

module.exports = router; 