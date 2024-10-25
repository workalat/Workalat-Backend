let express = require("express");
let createMilestoneController = require("../../controller/client/createMilestoneController");

let router = express.Router();

router.post("/", createMilestoneController);

module.exports = router;