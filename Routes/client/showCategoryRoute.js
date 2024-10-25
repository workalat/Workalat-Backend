let express = require("express");
let showCategoryController = require("../../controller/client/showCategoryController");

let router = express.Router();

router.get("/", showCategoryController);

module.exports = router;