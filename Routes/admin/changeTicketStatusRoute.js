let express = require("express");
let changeTicketStatusController = require("../../controller/admin/changeTicketStatusController");

let router = express.Router();

router.post("/", changeTicketStatusController);

module.exports = router;