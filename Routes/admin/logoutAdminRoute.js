let express = require("express");
let logoutAdminController = require("../../controller/admin/logoutAdminController");

let router = express.Router();

router.post("/", logoutAdminController);

module.exports = router;