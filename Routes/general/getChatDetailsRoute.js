let express = require("express");
let getChatDetailsController = require("../../controller/general/getChatDetailsController");

let router = express.Router();

router.post("/", getChatDetailsController);

module.exports = router;