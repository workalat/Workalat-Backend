let express = require("express");
let showAwardedShortProfController = require("../../controller/professional/showAwardedShortProfController");

let router = express.Router();

router.post("/", showAwardedShortProfController);

module.exports = router;