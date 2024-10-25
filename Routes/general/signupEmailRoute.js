let express = require("express");
let signupEmailController = require("../../controller/general/signupEmailController");

let router = express.Router();

router.post("/", signupEmailController);

module.exports = router;