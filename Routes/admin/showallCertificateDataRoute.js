let express = require("express");
let showallCertificateDataController = require("../../controller/admin/showallCertificateDataController");

let router = express.Router();

router.post("/", showallCertificateDataController);

module.exports = router;