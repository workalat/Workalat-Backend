let express = require("express");
let addWalletTopupDataProfessionalController = require("../../controller/professional/addWalletTopupDataProfessionalController");

let router = express.Router();

router.post("/", addWalletTopupDataProfessionalController);

module.exports = router;