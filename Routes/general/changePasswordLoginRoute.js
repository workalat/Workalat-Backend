let express = require("express");
let changePasswordLoginController = require("../../controller/general/changePasswordLoginController");

let router = express.Router();

router.post("/", changePasswordLoginController);

module.exports = router;