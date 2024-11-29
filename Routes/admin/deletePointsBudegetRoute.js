let express = require("express");
let deletePointsBudegetController = require("../../controller/admin/deletePointsBudegetController");

let router = express.Router();

router.post("/", deletePointsBudegetController);

module.exports = router;