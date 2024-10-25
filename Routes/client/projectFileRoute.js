let express = require("express");
let projectFileController = require("../../controller/client/projectFileController");
let multer = require("multer")
let router = express.Router();

 
const storage = multer.memoryStorage();
    
const upload = multer({ storage: storage }) 

// // Multer storage Multiple (Room images)
// const storage2 = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${Date.now()}-${file.originalname}`)
//     }
//   })
  
// const upload2 = multer({ storage: storage2 })

router.post("/", upload.single('f') ,projectFileController);

module.exports = router;