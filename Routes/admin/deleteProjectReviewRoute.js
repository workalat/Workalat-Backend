let express = require("express");
let deleteProjectReviewController = require("../../controller/admin/deleteProjectReviewController");

let router = express.Router();

router.post("/", deleteProjectReviewController);

module.exports = router;