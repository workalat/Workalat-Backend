const ProfessionalsData = require("../../models/Professional");
let cloudinary = require("cloudinary").v2;

// Cloudinary Setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Check spelling here
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



async function applyCertificationController(req, res) {
    let professionalId = req.body.professionalId;
    let certificateTitle = req.body.certificationTitle;
    let certificateExpirationMonth = req.body.certificateExpirationMonth;
    let certificateExpirationYear = req.body.certificateExpirationYear;
    let isExpired = req.body.isExpired; //Boolean

    console.log(req.body);
    console.log(req.file);


    try {
        let professional = await ProfessionalsData.findOne({_id : professionalId});

        if(professional === null){
            throw new Error("Invalid Credentials, please login again");
        }

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ status: "fail", userStatus : "FAIL", message: "No file uploaded" });
        }

        // Upload image to Cloudinary in the 'hotel_logos' folder
        const result = await new Promise((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream(
                {
                    folder: `professional/${professionalId}/certificates` // Folder where the files will be saved
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
        // console.log("Certification Image logo URL:", picture);

        let certificate = {
            professionalId : professionalId,
            professionalName : professional.professionalFullName,
            timeStamp : Date.now(),
            status : "pending",
            certificateTitle : certificateTitle,
            certificateExpirationMonth : certificateExpirationMonth,
            certificateExpirationYear : certificateExpirationYear,
            isExpired : `${isExpired || isExpired === true ? "Will Expire" : "Does not Expire"}`,
            certificationImage : picture ,
            adminComment : ""
        };

        professional.certifications.push(certificate);
        professional.isAppliedCertificate = true;
        await professional.save();
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Applied for Certification Successfully"});
    }
    catch (e) {
        console.log("Error while checking out for wallet topup of professionals.", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message, });
    }
};

module.exports = applyCertificationController;