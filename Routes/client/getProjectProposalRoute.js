let express = require("express");
let getProjectProposalController = require("../../controller/client/getProjectProposalController");

let router = express.Router();

router.post("/", getProjectProposalController);

module.exports = router;