let express = require("express");
let acceptMilestonePaymentController = require("../../controller/professional/acceptMilestonePaymentController");

let router = express.Router();

router.post("/", acceptMilestonePaymentController);

module.exports = router;