let express = require("express");
let adminLoginController = require("../../controller/admin/adminLoginController");

let router = express.Router(); 

router.post("/", adminLoginController);

module.exports = router;