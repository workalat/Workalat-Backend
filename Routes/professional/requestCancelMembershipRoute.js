let express = require("express");
let requestCancelMembershipController = require("../../controller/professional/requestCancelMembershipController");

let router = express.Router();

router.post("/", requestCancelMembershipController);

module.exports = router;