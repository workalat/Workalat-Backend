let express = require("express");
let dashboardDataController = require("../../controller/admin/dashboardDataController");

let router = express.Router();

router.post("/", dashboardDataController);

module.exports = router;