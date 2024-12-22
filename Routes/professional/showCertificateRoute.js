let express = require("express");
let showCertificateController = require("../../controller/professional/showCertificateController");

let router = express.Router();

router.post("/", showCertificateController);

module.exports = router;