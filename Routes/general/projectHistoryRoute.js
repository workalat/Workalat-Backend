let express = require("express");
let projectHistoryController = require("../../controller/general/projectHistoryController");

let router = express.Router();

router.post("/", projectHistoryController);

module.exports = router;