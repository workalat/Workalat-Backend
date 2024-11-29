let express = require("express");
let creditAndWalletController = require("../../controller/admin/creditAndWalletController");

let router = express.Router();

router.get("/", creditAndWalletController);

module.exports = router;