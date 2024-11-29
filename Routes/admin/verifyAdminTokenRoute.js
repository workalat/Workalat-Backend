let express = require("express");
let verifyAdminTokenController = require("../../controller/admin/verifyAdminTokenController");

let router = express.Router();

router.post("/", verifyAdminTokenController);

module.exports = router;