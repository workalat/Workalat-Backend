let express = require("express");
let clientReviewTakingController = require("../../controller/client/clientReviewTakingController");

let router = express.Router();

router.post("/", clientReviewTakingController);

module.exports = router;