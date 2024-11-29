let express = require("express");
let deletePointsWalletDataController = require("../../controller/admin/deletePointsWalletDataController");

let router = express.Router();

router.post("/", deletePointsWalletDataController);

module.exports = router;