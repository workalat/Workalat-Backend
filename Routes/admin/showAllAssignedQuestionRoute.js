let express = require("express");
let showAllAssignedQuestionsController = require("../../controller/admin/showAllAssignedQuestionsController");

let router = express.Router();

router.get("/", showAllAssignedQuestionsController);

module.exports = router;