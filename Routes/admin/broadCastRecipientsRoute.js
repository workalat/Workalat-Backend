let express = require("express");
let broadCastRecipientsController = require("../../controller/admin/broadCastRecipientsController");

let router = express.Router();

router.post("/", broadCastRecipientsController);

module.exports = router;