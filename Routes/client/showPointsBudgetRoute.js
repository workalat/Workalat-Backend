let express = require("express");
let showPointsBudgetController = require("../../controller/client/showPointsBudgetController");

let router = express.Router();

router.post("/", showPointsBudgetController);

module.exports = router;