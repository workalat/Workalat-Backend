let express = require("express");
let addMembershipPurchaseDataController = require("../../controller/professional/addMembershipPurchaseDataController");

let router = express.Router();

router.post("/", addMembershipPurchaseDataController);

module.exports = router;