let express = require("express");
let showSingleProjectAdminLeadsController = require("../../controller/admin/showSingleProjectAdminLeadsController");

let router = express.Router();

router.post("/", showSingleProjectAdminLeadsController);

module.exports = router;