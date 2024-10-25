let express = require("express");
let userChatDetailsController = require("../../controller/general/userChatDetailsController");

let router = express.Router();

router.post("/", userChatDetailsController);

module.exports = router; 