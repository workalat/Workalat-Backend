let express = require("express");
let getMembershipDetailsController = require("../../controller/professional/getMembershipDetailsController");

let router = express.Router();

router.post("/", getMembershipDetailsController);

module.exports = router;