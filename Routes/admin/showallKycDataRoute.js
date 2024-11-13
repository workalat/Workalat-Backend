let express = require("express");
let showallKycDataController = require("../../controller/admin/showallKycDataController");

let router = express.Router();

router.post("/", showallKycDataController);

module.exports = router;