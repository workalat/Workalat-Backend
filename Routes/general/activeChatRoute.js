let express = require("express");
let activeChatController = require("../../controller/general/activeChatController");

let router = express.Router();

router.post("/", activeChatController);

module.exports = router;