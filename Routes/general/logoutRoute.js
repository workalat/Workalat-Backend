let express = require("express");
let logoutController = require("../../controller/general/logoutController");

let router = express.Router();

router.post("/", logoutController);

module.exports = router;