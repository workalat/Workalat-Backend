let express = require("express");
let getPointsCategoryController = require("../../controller/general/getPointsCategoryController");

let router = express.Router();

router.post("/", getPointsCategoryController);

module.exports = router;