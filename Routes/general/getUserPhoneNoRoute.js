let express = require("express");
let getUserPhoneNoController = require("../../controller/general/getUserPhoneNoController");

let router = express.Router();

router.post("/", getUserPhoneNoController);

module.exports = router;