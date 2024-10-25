let express = require("express");
let changeProfilePictureController = require("../../controller/general/changeProfilePictureController");
let multer = require("multer");
let router = express.Router();

 
 
const storage = multer.memoryStorage();
    
const upload = multer({ storage: storage })

router.post("/", upload.single("profilePic") ,changeProfilePictureController);

module.exports = router;