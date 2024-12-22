let express = require("express");
let userAccessController = require("../../controller/admin/userAccessController");

let router = express.Router();

router.post("/", userAccessController);

module.exports = router;