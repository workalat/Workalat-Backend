let express = require("express");
let changeEmailController = require("../../controller/general/changeEmailController");

let router = express.Router();

router.post("/", changeEmailController);

module.exports = router;