let express = require("express");
let changesRequestController = require("../../controller/general/changesRequestController");

let router = express.Router();

router.post("/", changesRequestController);

module.exports = router;