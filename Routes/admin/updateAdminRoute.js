let express = require("express");
let updateAdminController = require("../../controller/admin/updateAdminController");

let router = express.Router();

router.post("/", updateAdminController);

module.exports = router;