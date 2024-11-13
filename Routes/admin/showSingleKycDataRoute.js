let express = require("express");
let showSingleKycDataController = require("../../controller/admin/showSingleKycDataController");

let router = express.Router();

router.post("/", showSingleKycDataController);

module.exports = router;