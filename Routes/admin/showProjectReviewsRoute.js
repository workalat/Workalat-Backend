let express = require("express");
let showProjectReviewsController = require("../../controller/admin/showProjectReviewsController");

let router = express.Router();

router.get("/", showProjectReviewsController);

module.exports = router;