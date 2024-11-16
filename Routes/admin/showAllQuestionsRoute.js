let express = require("express");
let showAllQuestionsController = require("../../controller/admin/showAllQuestionsController");

let router = express.Router();

router.get("/", showAllQuestionsController);

module.exports = router;