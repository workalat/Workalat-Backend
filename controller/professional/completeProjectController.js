const AwardedData = require("../../models/Awarded");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function completeProjectController(req, res) {
    // let professionalId = req.body.professionalId;
    let awardedId = req.body.awardedId;

    try {
        let award = await AwardedData.findOne({_id : awardedId});
        let project = await ProjectsData.findOne({_id : award.ProjectId});
        // console.log(award);

        award.ProjectStatusProfessional = "completed";
        project.projectStatusProfessional = "completed";

        await award.save();
        await project.save();

        res.status(200).json({status: "success", userStatus: "SUCCESS", message: "Project Completed Successfully"});
        


    }
    catch (e) {
        console.log("Error while checking out for wallet topup of professionals.", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message, });
    }
};

module.exports = completeProjectController;