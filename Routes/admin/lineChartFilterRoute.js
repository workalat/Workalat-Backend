let express = require("express");
let lineChartFilterController = require("../../controller/admin/lineChartFilterController");

let router = express.Router();

router.post("/", lineChartFilterController);

module.exports = router;