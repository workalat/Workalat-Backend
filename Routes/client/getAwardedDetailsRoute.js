let express = require("express");
let getAwardedDetailsController = require("../../controller/client/getAwardedDetailsController");

let router = express.Router();

router.post("/", getAwardedDetailsController);

module.exports = router;