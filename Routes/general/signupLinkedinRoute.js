let express = require("express");
let signupLinkedinController = require("../../controller/general/signupLinkedinController");

let router = express.Router();

router.post("/", signupLinkedinController);

module.exports = router;