let express = require("express");
let kycDocumentController = require("../../controller/general/kycDocumentController");
let multer = require("multer");
let router = express.Router();


 
const storage = multer.memoryStorage();
    
const upload = multer({ storage: storage })

router.post("/", upload.array("kycDocuments") ,kycDocumentController);

module.exports = router;