let express = require("express");
let respondTicketController = require("../../controller/general/respondTicketController");

let router = express.Router();

router.post("/", respondTicketController);

module.exports = router;