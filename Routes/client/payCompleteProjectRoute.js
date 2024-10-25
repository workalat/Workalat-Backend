let express = require("express");
let payCompleteProjectController = require("../../controller/client/payCompleteProjectController");

let router = express.Router();

router.post("/", payCompleteProjectController);

module.exports = router;