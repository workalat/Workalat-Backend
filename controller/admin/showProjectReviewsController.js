const AdminFeaturesData = require("../../models/AdminFeatures");
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
        let clientReviews = data
            .filter((val) => val?.clientReview?.giverId) // Filter to include only valid client reviews
            .map((val) => {
                val.clientReview.userType = "professional"; // Add userType to clientReview
                return val.clientReview; // Return the modified clientReview object
            });

        // Process professional reviews
        let professionalReviews = data
            .filter((val) => val?.professionalReview?.giverId) // Filter to include only valid professional reviews
            .map((val) => {
                val.professionalReview.userType = "client"; // Add userType to professionalReview
                return val.professionalReview; // Return the modified professionalReview object
            });

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
