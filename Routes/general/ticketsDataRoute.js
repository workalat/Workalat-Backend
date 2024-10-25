let express = require("express");
let ticketsDataController = require("../../controller/general/ticketsDataController");

let router = express.Router();

router.post("/", ticketsDataController);

module.exports = router;