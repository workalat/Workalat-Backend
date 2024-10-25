let express = require("express");
let addPhoneNoProfessionalController = require("../../controller/professional/addPhoneNoProfessionalController");

let router = express.Router();

router.post("/", addPhoneNoProfessionalController);

module.exports = router;