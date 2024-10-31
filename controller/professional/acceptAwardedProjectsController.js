let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");

async function acceptAwardedProjectsController(req, res) {
  try {
    let professionalId = req.body.professionalId;
    let projectId = req.body.projectId;
    let choice = req.body.choice; //accept/reject

    let project = await ProjectsData.findOne({
      $and: [{ awardedProfessionalId: professionalId }, { _id: projectId }],
    });

    if (project === null) {
      throw new Error("Project not found");
    } else {
      if (choice === "accept") {
        let award = await AwardedData.findOne({ _id: project.awardedDetails });
        // let professional = await ProfessionalsData.findOne({_id : professionalId});
        if (award === null) {
          throw new Error(
            "Some error has occured please login again, or contact support team"
          );
        } else {
          award.ProjectStatusProfessional = "awarded";
          project.projectStatusProfessional = "awarded";

          await award.save();
          await project.save();

          res
            .status(200)
            .json({
              status: "success",
              userStatus: "SUCCESS",
              message: "Project Accepted Successfully",
            });
        }
      } else {
        
        project.projectStatusProfessional = "pending";
        project.projectStatusClient = "pending";
        project.awardedStatus = "unawarded";
        project.awardedProfessionalId = "";
        await AwardedData.deleteOne({_id : project.awardedDetails});
        project.awardedDetails = "";
        await project.save();
        res.status(200).json({status : "success", userStatus: "SUCCESS", message: "Project Declined Successfully"});
      }
    }
  } catch (e) {
    console.log("Error while adding professional's details", e);
    res
      .status(400)
      .json({ status: "fail", userStatus: "FAILED", message: e.message });
  }
}

module.exports = acceptAwardedProjectsController;
