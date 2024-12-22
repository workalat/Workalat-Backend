let express = require("express");
let updateRankingDataController = require("../../controller/admin/updateRankingDataController");

let router = express.Router();

router.post("/", updateRankingDataController);

module.exports = router;