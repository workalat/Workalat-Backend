let express = require("express");
let allUserController = require("../../controller/admin/allUserController");

let router = express.Router();

router.post("/", allUserController);

module.exports = router;