let express = require("express");
let deleteTaskListController = require("../../controller/general/deleteTaskListController");

let router = express.Router();

router.post("/", deleteTaskListController);

module.exports = router;