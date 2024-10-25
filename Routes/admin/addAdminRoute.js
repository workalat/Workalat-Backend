let express = require("express");
let addAdminController = require("../../controller/admin/addAdminController");

let router = express.Router();

router.post("/", addAdminController);

module.exports = router;