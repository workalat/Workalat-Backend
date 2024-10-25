let express = require("express");
let professionalSignupController = require("../../controller/professional/professionalSignupController");

let router = express.Router();

router.post("/", professionalSignupController);

module.exports = router;