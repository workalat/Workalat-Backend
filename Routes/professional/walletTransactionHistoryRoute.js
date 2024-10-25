let express = require("express");
let walletTransactionHistoryController = require("../../controller/professional/walletTransactionHistoryController");

let router = express.Router();

router.post("/", walletTransactionHistoryController);

module.exports = router;