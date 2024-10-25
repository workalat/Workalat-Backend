let ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
let cloudinary = require("cloudinary").v2;

// Cloudinary Setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Check spelling here
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}); 
async function kycDocumentController(req, res) {
    // console.log(req.files);
    // console.log(req.body);
    let userId = req.body.userId;
    let userType = req.body.userType;
    let documentType = req.body.documentType;
    let idNumber = req.body.idNumber;
    let files = req.files;
    try {

        if (userType === "client") {
            let data = await ClientsData.findOne({ _id: userId });
            if (data !== null) {
                let document_arr = [];
                // Upload each file to Cloudinary from memory
                for (let key of Object.keys(files)) {
                    let file = files[key];
                    // console.log(file)
                    if (file && file.buffer) {
                        try {
                            let result = await new Promise((resolve, reject) => {
                                let upload_stream = cloudinary.uploader.upload_stream({
                                    folder: `client/${userId}/kyc`
                                }, (error,result) => {
                                    if (error) return reject(error);
                                    resolve(result);
                                });
                                upload_stream.end(file.buffer);
                            });
                            document_arr.push(result.secure_url);
                            // console.log(`Uploaded ${key} to Cloudinary: ${result.secure_url}`);
                        } catch (error) {
                            console.error(`Error uploading ${key} to Cloudinary`, error);
                        }
                    } else {
                        console.error(`File buffer for ${key} is undefined`);
                    }
                }
                // console.log(document_arr);
                data.kyc[0].documentType = documentType;
                data.kyc[0].idNumber = idNumber;
                data.kyc[0].documentPictures = [...document_arr];
                await data.save();
                res.status(200).json({status :"success", userStatus : "SUCCESS", message : "Data Uploaded Successfully"});
            }
            else {
                res.status(400).json({ status: "fail", userStatus: "FAIL", message: "Invalid Credentials, please login again" });
            }
        }
        else {
            let data = await ProfessionalsData.findOne({ _id: userId });
            if(data !== null){
                
                let document_arr = [];
                // Upload each file to Cloudinary from memory
                for (let key of Object.keys(files)) {
                    let file = files[key];
                    // console.log(file)
                    if (file && file.buffer) {
                        try {
                            let result = await new Promise((resolve, reject) => {
                                let upload_stream = cloudinary.uploader.upload_stream({
                                    folder: `client/${userId}/kyc`
                                }, (error,result) => {
                                    if (error) return reject(error);
                                    resolve(result);
                                });
                                upload_stream.end(file.buffer);
                            });
                            document_arr.push(result.secure_url);
                            // console.log(`Uploaded ${key} to Cloudinary: ${result.secure_url}`);
                        } catch (error) {
                            console.error(`Error uploading ${key} to Cloudinary`, error);
                        }
                    } else {
                        console.error(`File buffer for ${key} is undefined`);
                    }
                }
                // console.log(document_arr);
                data.kyc[0].documentType = documentType;
                data.kyc[0].idNumber = idNumber;
                data.kyc[0].documentPictures = [...document_arr];
                await data.save();
                res.status(200).json({status :"success", userStatus : "SUCCESS", message : "Data Uploaded Successfully"});

            }
            else{
                res.status(400).json({ status: "fail", userStatus: "FAIL", message: "Invalid Credentials, please login again" });
            }

        }


    }
    catch (e) {
        console.log("Error while Adding KYC Details. ", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};


module.exports = kycDocumentController;