let express = require("express");
let confirmBidController = require("../../controller/professional/confirmBidController");

let router = express.Router();

router.post("/", confirmBidController);

module.exports = router;