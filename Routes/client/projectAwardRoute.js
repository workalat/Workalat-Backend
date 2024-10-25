let express = require("express");
let projectAwardController = require("../../controller/client/projectAwardController");

let router = express.Router();

router.post("/", projectAwardController);

module.exports = router;