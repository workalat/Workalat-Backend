let express = require("express");
let allTicketsDataController = require("../../controller/admin/allTicketsDataController");

let router = express.Router();

router.get("/", allTicketsDataController);

module.exports = router;