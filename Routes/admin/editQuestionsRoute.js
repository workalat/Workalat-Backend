let express = require("express");
let editQuestionsController = require("../../controller/admin/editQuestionsController");

let router = express.Router();

router.post("/", editQuestionsController);

module.exports = router;