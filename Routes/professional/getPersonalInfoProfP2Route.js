let express = require("express");
let getPersonalInfoProfP2Controller = require("../../controller/professional/getPersonalInfoProfP2Controller");

let router = express.Router();

router.post("/", getPersonalInfoProfP2Controller);

module.exports = router;