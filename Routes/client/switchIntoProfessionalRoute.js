let express = require("express");
let switchIntoProfessionalController = require("../../controller/client/switchIntoProfessionalController");

let router = express.Router();

router.post("/", switchIntoProfessionalController);

module.exports = router;