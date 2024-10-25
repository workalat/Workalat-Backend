let express = require("express");
let getPersonalClientInfoController = require("../../controller/client/getPersonalClientInfoController");

let router = express.Router();

router.post("/", getPersonalClientInfoController);

module.exports = router;