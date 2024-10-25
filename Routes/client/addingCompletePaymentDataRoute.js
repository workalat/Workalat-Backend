let express = require("express");
let addingCompletePaymentDataController = require("../../controller/client/addingCompletePaymentDataController");

let router = express.Router();

router.post("/", addingCompletePaymentDataController);

module.exports = router;