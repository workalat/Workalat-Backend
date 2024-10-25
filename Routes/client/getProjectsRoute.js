let express = require("express");
let getProjectsController = require("../../controller/client/getProjectsController");

let router = express.Router();

router.post("/", getProjectsController);

module.exports = router;