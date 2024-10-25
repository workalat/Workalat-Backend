let express = require("express");
let projectFileUploadingController = require("../../controller/general/projectFileUploadingController");
let multer = require("multer");
let router = express.Router();


 
const storage = multer.memoryStorage();
    
const upload = multer({ storage: storage })

router.post("/", upload.array("projectFiles") ,projectFileUploadingController);

module.exports = router;