let express = require("express");
let addCategoryController = require("../../controller/admin/addCategoryController");

let router = express.Router();

router.post("/", addCategoryController);

module.exports = router;