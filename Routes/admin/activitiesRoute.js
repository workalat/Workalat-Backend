let express = require("express");
let activitiesController = require("../../controller/admin/activitiesController");

let router = express.Router();

router.get("/", activitiesController);

module.exports = router;