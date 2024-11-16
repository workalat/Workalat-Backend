let express = require("express");
let showAllServiceDataController = require("../../controller/admin/showAllServiceDataController");

let router = express.Router();

router.post("/", showAllServiceDataController);

module.exports = router;