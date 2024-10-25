const AwardedData = require("../../models/Awarded");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
let cloudinary = require("cloudinary").v2;

// Cloudinary Setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Check spelling here
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function projectFileUploadingController(req, res) {
    try {
        let userId = req.body.userId;
        let userType = req.body.userType;
        let projectId = req.body.projectId;
        let files = req.files;
        
        let projectData = await ProjectsData.findOne({_id : projectId});

        if(userType === "client"){
            let userData = await ClientsData.findOne({_id : userId});
            if(userData !== null){

                let document_arr = [];
                // Upload each file to Cloudinary from memory
                for (let key of Object.keys(files)) {
                    let file = files[key];
                    console.log(file)
                    if (file && file.buffer) {
                        try {
                            let result = await new Promise((resolve, reject) => {
                                let upload_stream = cloudinary.uploader.upload_stream({
                                    folder: `projects/${projectId}`
                                }, (error,result) => {
                                    if (error) return reject(error);
                                    resolve(result);
                                });
                                upload_stream.end(file.buffer);
                            });
                            document_arr.push({
                                url : result.secure_url,
                                uploadedBy : userData.clientFullName,
                                fileName : file.originalname,
                                fileSize : file.size,
                                fileType : file.mimetype,
                                date : Date.now()
                            });
                            // console.log(`Uploaded ${key} to Cloudinary: ${result.secure_url}`);
                        } catch (error) {
                            // console.error(`Error uploading ${key} to Cloudinary`, error);
                        }
                    } else {
                        // console.error(`File buffer for ${key} is undefined`);
                    }
                }
                // console.log(document_arr);
                    projectData.projectFileURL.push(...document_arr);
                    await projectData.save();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Files uploaded successfully"});
            }
            else{
                res.status(400).json({status : "fail", userStatus : "FAIL", message : "Invalid Credentials, please login again"});
            }
        }
        else{
            let userData = await ProfessionalsData.findOne({_id : userId});
            if(userData !== null){

                let document_arr = [];
                // Upload each file to Cloudinary from memory
                for (let key of Object.keys(files)) {
                    let file = files[key];
                    console.log(file)
                    if (file && file.buffer) {
                        try {
                            let result = await new Promise((resolve, reject) => {
                                let upload_stream = cloudinary.uploader.upload_stream({
                                    folder: `projects/${projectId}`
                                }, (error,result) => {
                                    if (error) return reject(error);
                                    resolve(result);
                                });
                                upload_stream.end(file.buffer);
                            });
                            document_arr.push({
                                url : result.secure_url,
                                uploadedBy : userData.professionalFullName,
                                fileName : file.originalname,
                                fileSize : file.size,
                                fileType : file.mimetype,
                                date : Date.now()
                            });
                            // console.log(`Uploaded ${key} to Cloudinary: ${result.secure_url}`);
                        } catch (error) {
                            // console.error(`Error uploading ${key} to Cloudinary`, error);
                        }
                    } else {
                        // console.error(`File buffer for ${key} is undefined`);
                    }
                }
                // console.log(document_arr);
                    projectData.projectFileURL.push(...document_arr);
                    await projectData.save();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Files uploaded successfully"});
            }
            else{
                res.status(400).json({status : "fail", userStatus : "FAIL", message : "Invalid Credentials, please login again"});
            }

        }

    }
    catch (e) {
        console.log("Error while Adding KYC Details. ", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};


module.exports = projectFileUploadingController;