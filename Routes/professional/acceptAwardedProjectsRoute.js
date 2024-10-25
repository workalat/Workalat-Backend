let express = require("express");
let acceptAwardedProjectsController = require("../../controller/professional/acceptAwardedProjectsController");

let router = express.Router();

router.post("/", acceptAwardedProjectsController);

module.exports = router;