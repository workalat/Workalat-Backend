const AwardedData = require("../../models/Awarded");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function markAsAwardedController(req, res){
    try{
        let clientId  = req.body.clientId;
        let projectId = req.body.projectId;
        console.log(req.body);
        let project = await ProjectsData.findOne({$and : [{_id : projectId}, {clientId : clientId}]});
        console.log(project);
        if(project === null){
            throw new Error("Wrong Project Id, or maybe the project has not been approved by admin")
        }
        
        let awarded = await AwardedData.findOne({_id : project.awardedId});

        if(awarded === null){
            throw new Error("You can not mark as awarded, before awarding a project")
        }
        project.projectStatusClient = "awarded";
        awarded.awardedStatusClient = "awarded";

        await project.save();
        await awarded.save();
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Project status changed successfully", currentAwardStatus : project.projectStatusClient});
    }
    catch(e){
        console.log("Error while Adding KYC Details. ", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = markAsAwardedController;