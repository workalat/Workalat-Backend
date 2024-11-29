let express = require("express");
let editServiceController = require("../../controller/admin/editServiceController");

let router = express.Router();

router.post("/", editServiceController);

module.exports = router;