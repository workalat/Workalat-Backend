let express = require("express");
let signinLinkedinController = require("../../controller/general/signinLinkedinController");

let router = express.Router();

router.post("/", signinLinkedinController);

module.exports = router;