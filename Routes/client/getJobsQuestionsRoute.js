let express = require("express");
let getJobsQuestionsController = require("../../controller/client/getJobsQuestionsController");

let router = express.Router();

router.post("/", getJobsQuestionsController);

module.exports = router;