let express = require("express");
let deleteWalletDataController = require("../../controller/admin/deleteWalletDataController");

let router = express.Router();

router.post("/", deleteWalletDataController);

module.exports = router;