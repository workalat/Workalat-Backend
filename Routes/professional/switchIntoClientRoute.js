let express = require("express");
let switchIntoClientController = require("../../controller/professional/switchIntoClientController");

let router = express.Router();

router.post("/", switchIntoClientController);

module.exports = router;