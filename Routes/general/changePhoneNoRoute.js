let express = require("express");
let changePhoneNoContoller = require("../../controller/general/changePhoneNoContoller");

let router = express.Router();

router.post("/", changePhoneNoContoller);

module.exports = router;