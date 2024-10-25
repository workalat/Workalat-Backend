let express = require("express");
let showSingleProjectLeadController = require("../../controller/professional/showSingleProjectLeadController");

let router = express.Router();

router.post("/", showSingleProjectLeadController);

module.exports = router;