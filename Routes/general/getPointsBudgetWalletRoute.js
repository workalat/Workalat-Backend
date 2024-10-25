let express = require("express");
let getPointsBudgetWalletController = require("../../controller/general/getPointsBudgetWalletController");

let router = express.Router();

router.get("/", getPointsBudgetWalletController);

module.exports = router;