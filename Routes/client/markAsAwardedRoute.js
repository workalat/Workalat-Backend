let express = require("express");
let markAsAwardedController = require("../../controller/client/markAsAwardedController");
 
let router = express.Router();
 
router.post("/", markAsAwardedController);

module.exports = router;