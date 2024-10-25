let express = require("express");
let addPointsBudgetController = require("../../controller/admin/addPointsBudgetController");

let router = express.Router();

router.post("/", addPointsBudgetController);

module.exports = router;