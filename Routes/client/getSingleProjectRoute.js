let express = require("express");
let getSingleProjectController = require("../../controller/client/getSingleProjectController");

let router = express.Router();

router.post("/", getSingleProjectController);

module.exports = router;