let express = require("express");
let deleteCategoryController = require("../../controller/admin/deleteCategoryController");

let router = express.Router();

router.post("/", deleteCategoryController);

module.exports = router;