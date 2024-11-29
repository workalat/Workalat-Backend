let express = require("express");
let showAllPointsWalletsDataController = require("../../controller/admin/showAllPointsWalletsDataController");

let router = express.Router();

router.get("/", showAllPointsWalletsDataController);

module.exports = router;