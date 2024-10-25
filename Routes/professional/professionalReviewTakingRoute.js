let express = require("express");
let professionalReviewTakingController = require("../../controller/professional/professionalReviewTakingController");

let router = express.Router();

router.post("/", professionalReviewTakingController);

module.exports = router;