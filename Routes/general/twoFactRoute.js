let express = require("express");
let twoFactController = require("../../controller/general/twoFactController");

let router = express.Router();

router.post("/", twoFactController);

module.exports = router;