let express = require("express");
let markAsAvailalbeController = require("../../controller/general/markAsAvailalbeController");

let router = express.Router();

router.post("/", markAsAvailalbeController);

module.exports = router;