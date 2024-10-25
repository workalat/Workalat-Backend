let express = require("express");
let addDetailsProfessionalsController = require("../../controller/professional/addDetailsProfessionalsController");

let router = express.Router();

router.post("/", addDetailsProfessionalsController);

module.exports = router;