let express = require("express");
let purchaseMembershipController = require("../../controller/professional/purchaseMembershipController");

let router = express.Router();

router.post("/", purchaseMembershipController);

module.exports = router;