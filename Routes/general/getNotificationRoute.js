let express = require("express");
let getNotificationController = require("../../controller/general/getNotificationController");

let router = express.Router();

router.post("/", getNotificationController);

module.exports = router;