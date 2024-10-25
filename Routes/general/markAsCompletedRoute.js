let express = require("express");
let markAsCompletedController = require("../../controller/general/markAsCompletedController");

let router = express.Router();

router.post("/", markAsCompletedController);

module.exports = router;