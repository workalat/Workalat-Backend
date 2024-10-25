let express = require("express");
let verfiyEmailController = require("../../controller/general/verifyEmailController");

let router = express.Router();

router.post("/", verfiyEmailController);

module.exports = router;