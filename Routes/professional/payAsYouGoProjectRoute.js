let express = require("express");
let payAsYouGoProjectController = require("../../controller/professional/payAsYouGoProjectController");

let router = express.Router();

router.post("/", payAsYouGoProjectController);

module.exports = router;