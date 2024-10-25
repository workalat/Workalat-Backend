let express = require("express");
let showSingleProjectProfController = require("../../controller/professional/showSingleProjectProfController");

let router = express.Router();

router.post("/", showSingleProjectProfController);

module.exports = router;