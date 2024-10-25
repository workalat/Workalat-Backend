let express = require("express");
let filterProjectController = require("../../controller/professional/filterProjectController");

let router = express.Router();

router.post("/", filterProjectController);

module.exports = router;