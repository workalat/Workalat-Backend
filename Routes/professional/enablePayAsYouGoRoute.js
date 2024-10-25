let express = require("express");
let enablePayAsYouGoController = require("../../controller/professional/enablePayAsYouGoController");

let router = express.Router();

router.post("/", enablePayAsYouGoController);

module.exports = router;