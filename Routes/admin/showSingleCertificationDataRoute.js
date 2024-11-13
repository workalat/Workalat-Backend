let express = require("express");
let showSingleCertificationDataController = require("../../controller/admin/showSingleCertificationDataController");

let router = express.Router();

router.post("/", showSingleCertificationDataController);

module.exports = router;