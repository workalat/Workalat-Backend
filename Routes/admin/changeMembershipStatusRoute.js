let express = require("express");
let changeMembershipStatusController = require("../../controller/admin/changeMembershipStatusController");

let router = express.Router();

router.post("/", changeMembershipStatusController);

module.exports = router;