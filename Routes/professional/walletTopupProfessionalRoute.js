let express = require("express");
let walletTopupProfessionalController = require("../../controller/professional/walletTopupProfessionalController");

let router = express.Router();

router.post("/", walletTopupProfessionalController);

module.exports = router;