let express = require("express");
let kycApprovalContoller = require("../../controller/admin/kycApprovalContoller");

let router = express.Router();

router.post("/", kycApprovalContoller);

module.exports = router;