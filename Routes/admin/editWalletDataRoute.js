let express = require("express");
let editWalletDataController = require("../../controller/admin/editWalletDataController");

let router = express.Router();

router.post("/", editWalletDataController);

module.exports = router;