let express = require("express");
let addPersonalClientInfoController = require("../../controller/client/addPersonalClientInfoController");

let router = express.Router();

router.post("/", addPersonalClientInfoController);

module.exports = router;