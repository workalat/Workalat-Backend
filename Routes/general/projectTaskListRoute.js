let express = require("express");
let projectTaskListController = require("../../controller/general/projectTaskListController");

let router = express.Router();

router.post("/", projectTaskListController);

module.exports = router;