let express = require("express");
let addPersonalInfoProfP2Controller = require("../../controller/professional/addPersonalInfoProfP2Controller");

let router = express.Router();

router.post("/", addPersonalInfoProfP2Controller);

module.exports = router;