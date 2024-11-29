let express = require("express");
let addPointsWalletController = require("../../controller/admin/addPointsWalletController");

let router = express.Router();

router.post("/", addPointsWalletController);

module.exports = router;