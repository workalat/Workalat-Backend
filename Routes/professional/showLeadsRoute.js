let express = require("express");
let showLeadsController = require("../../controller/professional/showLeadsController");

let router = express.Router();

router.post("/", showLeadsController);

module.exports = router;