let express = require("express");
let professionalDetailsController = require("../../controller/professional/professionalDetailsController");

let router = express.Router();

router.post("/", professionalDetailsController);

module.exports = router;