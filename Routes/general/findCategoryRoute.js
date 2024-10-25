let express = require("express");
let findCategoryController = require("../../controller/general/findCategoryController");

let router = express.Router();

router.post("/", findCategoryController);

module.exports = router;