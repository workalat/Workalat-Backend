let express = require("express");
let refundTransationController = require("../../controller/admin/refundTransationController");

let router = express.Router();

router.post("/", refundTransationController);

module.exports = router;