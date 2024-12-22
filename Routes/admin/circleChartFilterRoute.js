let express = require("express");
let circleChartFilterController = require("../../controller/admin/circleChartFilterController");

let router = express.Router();

router.post("/", circleChartFilterController);

module.exports = router;