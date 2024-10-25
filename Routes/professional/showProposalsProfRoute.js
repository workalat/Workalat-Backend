let express = require("express");
let showProposalsProfController = require("../../controller/professional/showProposalsProfController");

let router = express.Router();

router.post("/", showProposalsProfController);

module.exports = router;