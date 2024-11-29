let express = require("express");
let deleteJobAssignController = require("../../controller/admin/deleteJobAssignController");

let router = express.Router();

router.post("/", deleteJobAssignController);

module.exports = router;