let express = require("express");
let dashboardDataController = require("../../controller/general/dashboardDataController");

let router = express.Router();

router.post("/", dashboardDataController);

module.exports = router;