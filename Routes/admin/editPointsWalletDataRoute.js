let express = require("express");
let editPointsWalletDataController = require("../../controller/admin/editPointsWalletDataController");

let router = express.Router();

router.post("/", editPointsWalletDataController);

module.exports = router;