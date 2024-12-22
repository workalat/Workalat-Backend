let express = require("express");
let getRankingDataController = require("../../controller/admin/getRankingDataController");

let router = express.Router();

router.post("/", getRankingDataController);

module.exports = router;