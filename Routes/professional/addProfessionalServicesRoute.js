let express = require("express");
let addProfessionalServicesController = require("../../controller/professional/addProfessionalServicesController");

let router = express.Router();

router.post("/", addProfessionalServicesController);

module.exports = router;