let express = require("express");
let addJobQuestionController = require("../../controller/admin/addJobQuestionController");

let router = express.Router();

router.post("/", addJobQuestionController);

module.exports = router;