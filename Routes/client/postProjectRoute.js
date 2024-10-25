let express = require("express");
let postProjectController = require("../../controller/client/postProjectController");

let router = express.Router();

router.post("/", postProjectController);

module.exports = router;