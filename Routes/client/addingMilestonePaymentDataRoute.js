let express = require("express");
let addingMilestonePaymentDataController = require("../../controller/client/addingMilestonePaymentDataController");

let router = express.Router();

router.post("/", addingMilestonePaymentDataController);

module.exports = router;