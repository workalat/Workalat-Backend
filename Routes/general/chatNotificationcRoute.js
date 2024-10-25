let express = require("express");
let chatNotificationcController = require("../../controller/general/chatNotificationcController");

let router = express.Router();

router.post("/", chatNotificationcController);

module.exports = router;