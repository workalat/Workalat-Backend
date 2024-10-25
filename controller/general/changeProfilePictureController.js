let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let cloudinary = require("cloudinary").v2;

// Cloudinary Setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Check spelling here
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function changeProfilePictureController(req, res) {
    try {
        // console.log("File details:", req.file);
        // console.log("Request body:", req.body);
        // console.log(req.files);
        let userType = req.body.userType;
        let userId = req.body.userId;
        console.log(req.body);
        console.log(req.file);
        if(userType === "client"){ 
            let data = await ClientsData.findOne({_id : userId}).select({isClientPicture : 1, clientPictureLink : 1});
            if(data === null){
                return res.status(400).json({ status: "fail",userStatus : "FAIL" ,message: "No Data Found, please login again" });
            }
            else{
                if (!req.file || !req.file.buffer) {
                    return res.status(400).json({ status: "fail", userStatus : "FAIL", message: "No file uploaded" });
                }
        
                // Upload image to Cloudinary in the 'hotel_logos' folder
                const result = await new Promise((resolve, reject) => {
                    const upload_stream = cloudinary.uploader.upload_stream(
                        {
                            folder: `client/${userId}` // Folder where the files will be saved
                        },
                        (error, result) => {
                            if (error) {
                                // console.log("Error during upload:", error);
                                return reject(error);
                            }
                            // console.log("Upload successful:", result);
                            resolve(result);
                        }
                    );
                    upload_stream.end(req.file.buffer); // Send the file buffer to Cloudinary
                });
                const picture = result.secure_url;
                // console.log("Hotel logo URL:", picture);
                data.clientPictureLink = picture;
                data.isClientPicture = true;
                await data.save();
                res.status(200).json({ status : "success", userStatus : "SUCCESS",message: "Profile picture uploaded successfully", picture: picture });
            }
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId}).select({isprofessionalPicture : 1, professionalPictureLink : 1});
            if(data === null){
                return res.status(400).json({ status: "fail",userStatus : "FAIL" ,message: "No Data Found, please login again" });
            }
            else{
                if (!req.file || !req.file.buffer) {
                    return res.status(400).json({ status: "fail", userStatus : "FAIL", message: "No file uploaded" });
                }
        
                // Upload image to Cloudinary in the 'hotel_logos' folder
                const result = await new Promise((resolve, reject) => {
                    const upload_stream = cloudinary.uploader.upload_stream(
                        {
                            folder: `professional/${userId}` // Folder where the files will be saved
                        },
                        (error, result) => {
                            if (error) {
                                // console.log("Error during upload:", error);
                                return reject(error);
                            }
                            // console.log("Upload successful:", result);
                            resolve(result);
                        }
                    );
                    upload_stream.end(req.file.buffer); // Send the file buffer to Cloudinary
                });
                const picture = result.secure_url;
                // console.log("Hotel logo URL:", picture);
                data.professionalPictureLink = picture;
                data.isprofessionalPicture = true;
                await data.save();
                res.status(200).json({ status : "success", userStatus : "SUCCESS",message: "Profile picture uploaded successfully", picture: picture });
            }
            
        }

       
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ status: "fail", message: error.message });
    }
}

module.exports = changeProfilePictureController;
