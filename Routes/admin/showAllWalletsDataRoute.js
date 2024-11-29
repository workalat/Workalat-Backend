let express = require("express");
let showAllWalletsDataController = require("../../controller/admin/showAllWalletsDataController");

let router = express.Router();

router.get("/", showAllWalletsDataController);

module.exports = router;