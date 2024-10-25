let express = require("express");
let kycDetailsController = require("../../controller/general/kycDetailsController");

let router = express.Router();

router.post("/", kycDetailsController);

module.exports = router;