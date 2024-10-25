let express = require("express");
let addPersonalnfoProfP1Controller = require("../../controller/professional/addPersonalnfoProfP1Controller");

let router = express.Router();

router.post("/", addPersonalnfoProfP1Controller);

module.exports = router;