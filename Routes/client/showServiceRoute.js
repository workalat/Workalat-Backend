let express = require("express");
let showServiceController = require("../../controller/client/showServiceController");

let router = express.Router();

router.post("/", showServiceController);

module.exports = router;