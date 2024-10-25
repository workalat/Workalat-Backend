let express = require("express");
let reminderToReplyController = require("../../controller/general/reminderToReplyController");

let router = express.Router();

router.post("/", reminderToReplyController);

module.exports = router;