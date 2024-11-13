let express = require("express");
let showAllLeadsController = require("../../controller/admin/showAllLeadsController");

let router = express.Router();

router.post("/", showAllLeadsController);

module.exports = router;