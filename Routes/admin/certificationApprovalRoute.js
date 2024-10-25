let express = require("express");
let certificationApprovalController = require("../../controller/admin/certificationApprovalController");

let router = express.Router();

router.post("/", certificationApprovalController);

module.exports = router;