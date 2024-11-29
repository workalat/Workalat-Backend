let express = require("express");
let showAllAdminController = require("../../controller/admin/showAllAdminController");

let router = express.Router();

router.get("/", showAllAdminController);

module.exports = router;