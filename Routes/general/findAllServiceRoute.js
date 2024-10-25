let express = require("express");
let findAllServiceController = require("../../controller/general/findAllServiceController");

let router = express.Router();

router.get("/", findAllServiceController);

module.exports = router;