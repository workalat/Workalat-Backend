let express = require("express");
let applyCertificationController = require("../../controller/professional/applyCertificationController");
let multer = require("multer");
let router = express.Router();


 
const storage = multer.memoryStorage();
    
const upload = multer({ storage: storage })

// 
router.post("/", upload.single("certificationImage") ,applyCertificationController);

module.exports = router;