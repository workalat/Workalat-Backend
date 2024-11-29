let express = require("express");
let addPointsProfessionalController = require("../../controller/admin/addPointsProfessionalController");

let router = express.Router();

router.post("/", addPointsProfessionalController);

module.exports = router;