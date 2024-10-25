let express = require("express");
let verifyTokenController = require("../../controller/general/verifyTokenController");

let router = express.Router();

router.post("/", verifyTokenController);

module.exports = router;