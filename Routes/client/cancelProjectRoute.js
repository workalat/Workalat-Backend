let express = require("express");
let cancelProjectController = require("../../controller/client/cancelProjectController");

let router = express.Router();

router.post("/", cancelProjectController);

module.exports = router;