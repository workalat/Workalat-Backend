let express = require("express");
let getSingleUserDetailsController = require("../../controller/admin/getSingleUserDetailsController");

let router = express.Router();

router.post("/", getSingleUserDetailsController);

module.exports = router;