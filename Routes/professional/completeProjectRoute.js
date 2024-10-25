let express = require("express");
let completeProjectController = require("../../controller/professional/completeProjectController");

let router = express.Router();

router.post("/", completeProjectController);

module.exports = router;