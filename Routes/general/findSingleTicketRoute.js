let express = require("express");
let findSingleTicketController = require("../../controller/general/findSingleTicketController");

let router = express.Router();

router.post("/", findSingleTicketController);

module.exports = router;