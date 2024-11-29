let express = require("express");
let deleteServiceController = require("../../controller/admin/deleteServiceController");

let router = express.Router();

router.post("/", deleteServiceController);

module.exports = router;