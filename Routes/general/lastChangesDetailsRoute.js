let express = require("express");
let lastChangesDetailsController = require("../../controller/general/lastChangesDetailsController");

let router = express.Router();

router.post("/", lastChangesDetailsController);

module.exports = router;