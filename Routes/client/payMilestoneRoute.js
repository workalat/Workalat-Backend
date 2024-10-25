let express = require("express");
let payMilestoneController = require("../../controller/client/payMilestoneController");

let router = express.Router();

router.post("/", payMilestoneController);

module.exports = router;