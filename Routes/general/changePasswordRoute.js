let express = require("express");
let changePasswordController = require("../../controller/general/changePasswordController");

let router = express.Router();

router.post("/", changePasswordController);

module.exports = router;