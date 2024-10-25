let express = require("express");
let createTicketController = require("../../controller/general/createTicketController");

let router = express.Router();

router.post("/", createTicketController);

module.exports = router;