let express = require("express");
let addPayAsYouGoProjectDetailController = require("../../controller/professional/addPayAsYouGoProjectDetailController");

let router = express.Router();

router.post("/", addPayAsYouGoProjectDetailController);

module.exports = router;