let express = require("express");
let VerfiyPhoneController = require("../../controller/general/verifyPhoneController");

let router = express.Router();

router.post("/", VerfiyPhoneController);

module.exports = router;