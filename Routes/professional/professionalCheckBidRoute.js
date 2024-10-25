let express = require("express");
let professionalCheckBidController = require("../../controller/professional/professionalCheckBidController");

let router = express.Router();

router.post("/", professionalCheckBidController);

module.exports = router;