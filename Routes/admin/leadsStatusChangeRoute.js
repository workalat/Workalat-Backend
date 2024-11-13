let express = require("express");
let leadsStatusChangeController = require("../../controller/admin/leadsStatusChangeController");

let router = express.Router();

router.post("/", leadsStatusChangeController);

module.exports = router;