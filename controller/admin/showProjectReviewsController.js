const AdminFeaturesData = require("../../models/AdminFeatures");
const ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function showProjectReviewsController(req, res) {
    try {
        let data = await ProjectsData.find({
            $or: [
                { projectStatusClient: "completed" },
                { projectStatusProfessional: "completed" }
            ]
        }).select({ clientReview: 1, professionalReview: 1 });

        // Process client reviews
        let clientReviews = await Promise.all( data
            .filter((val) => val?.clientReview?.giverId) // Filter to include only valid client reviews
            .map(async (val) => { 
                let professionalData = await ProfessionalsData.findOne({_id : val?.clientReview?.giverId}).select({
                isprofessionalPhoneNoVerify : 1,
                isprofessionalEmailVerify  : 1,
                kycStatus : 1,
            });
                val.clientReview.userType = "professional"; // Add userType to clientReview
                if(professionalData !== null){
                    val.clientReview.isGiverVerify =professionalData.isprofessionalPhoneNoVerify && professionalData.isprofessionalEmailVerify ? true :  false;
                    val.clientReview.isGiverKycVerify =professionalData.kycStatus === "approved" ? true :  false;
                    return val.clientReview;
                };

                val.clientReview.isGiverVerify = false;
                val.clientReview.isGiverKycVerify =  false;
                return val.clientReview; // Return the modified clientReview object
            }));

        // Process professional reviews
        let professionalReviews = await Promise.all( data
            .filter((val) => val?.professionalReview?.giverId) // Filter to include only valid professional reviews
            .map(async (val) => {
                let clientsData = await ClientsData.findOne({_id : val?.val?.professionalReview?.giverId?.giverId}).select({
                    isClientEmailVerify : 1,
                    isClientPhoneNoVerify  : 1,
                    kycStatus : 1,
                });
                val.professionalReview.userType = "client"; // Add userType to professionalReview
                if(clientsData !== null){
                    val.professionalReview.isGiverVerify =clientsData.isClientEmailVerify && clientsData.isClientPhoneNoVerify ? true :  false;
                    val.professionalReview.isGiverKycVerify =clientsData.kycStatus === "approved" ? true :  false;
                    return val.professionalReview;
                };

                val.professionalReview.isGiverVerify = false;
                val.professionalReview.isGiverKycVerify =  false;
                return val.professionalReview; // Return the modified professionalReview object
            }));

        res.status(200).json({
            status: "success",
            userStatus: "SUCCESS",
            message: "Data Found successfully",
            data: { clientsData: clientReviews, professionalData: professionalReviews }
        });
    } catch (e) {
        console.log("Error while adding professional's details", e);
        res.status(400).json({
            status: "fail",
            userStatus: "FAILED",
            message: e.message
        });
    }
}

module.exports = showProjectReviewsController;
