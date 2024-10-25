let express = require("express");
let clientDetailsController = require("../../controller/client/clientDetailsController");

let router = express.Router();

router.post("/", clientDetailsController);

module.exports = router;