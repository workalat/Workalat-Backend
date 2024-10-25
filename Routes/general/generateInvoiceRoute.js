let express = require("express");
let generateInvoiceController = require("../../controller/general/generateInvoiceController");

let router = express.Router();

router.post("/", generateInvoiceController);

module.exports = router;