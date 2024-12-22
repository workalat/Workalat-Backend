let express = require("express");
let editTaskListController = require("../../controller/general/editTaskListController");

let router = express.Router();

router.post("/", editTaskListController);

module.exports = router;