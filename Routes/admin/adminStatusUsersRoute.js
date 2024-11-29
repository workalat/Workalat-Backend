let express = require("express");
let adminStatusUsersController = require("../../controller/admin/adminStatusUsersController");

let router = express.Router(); 

router.post("/", adminStatusUsersController);

module.exports = router;