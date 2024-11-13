let express = require("express");
let showSingleLeadsBidController = require("../../controller/admin/showSingleLeadsBidController");

let router = express.Router();

router.post("/", showSingleLeadsBidController);

module.exports = router;