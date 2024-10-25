let express = require("express");
let projectFilterController = require("../../controller/professional/projectFilterController");

let router = express.Router();

router.post("/", projectFilterController);

module.exports = router;