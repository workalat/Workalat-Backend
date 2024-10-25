let express = require("express");
let showAllAwardedProfController = require("../../controller/professional/showAllAwardedProfController");

let router = express.Router();

router.post("/", showAllAwardedProfController);

module.exports = router;