let express = require("express");
let getPersonalInfoProfP1Controlle = require("../../controller/professional/getPersonalInfoProfP1Controlle");

let router = express.Router();

router.post("/", getPersonalInfoProfP1Controlle);

module.exports = router;