let express = require("express");
let addServiceController = require("../../controller/admin/addServiceController");

let router = express.Router();

router.post("/", addServiceController);

module.exports = router;