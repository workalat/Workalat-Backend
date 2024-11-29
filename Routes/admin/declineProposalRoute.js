let express = require("express");
let declineProposalController = require("../../controller/admin/declineProposalController");

let router = express.Router();

router.post("/", declineProposalController);

module.exports = router;