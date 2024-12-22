let express = require("express");
let broadcastEmailController = require("../../controller/admin/broadcastEmailController");

let router = express.Router();

router.post("/", broadcastEmailController);

module.exports = router;