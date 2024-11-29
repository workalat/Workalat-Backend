let express = require("express");
let memberShipController = require("../../controller/admin/memberShipController");

let router = express.Router();

router.get("/", memberShipController);

module.exports = router;