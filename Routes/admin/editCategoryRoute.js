let express = require("express");
let editCategoryController = require("../../controller/admin/editCategoryController");

let router = express.Router();

router.post("/", editCategoryController);

module.exports = router;