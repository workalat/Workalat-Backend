let express = require("express");
let deleteQuestionController = require("../../controller/admin/deleteQuestionController");

let router = express.Router();

router.post("/", deleteQuestionController);

module.exports = router;