let express = require("express");
let addQuestionsController = require("../../controller/admin/addQuestionsController");

let router = express.Router();

router.post("/", addQuestionsController);

module.exports = router;