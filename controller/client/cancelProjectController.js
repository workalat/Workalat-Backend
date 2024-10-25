let ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function cancelProjectController(req, res){
    try{
        let clientId = req.body.clientId;
        let projectId = req.body.projectId;

        let project = await ProjectsData.findOne({$and : [{_id : projectId}, { clientId :clientId }]});
        console.log(req.body);

        if(project.awardedStatus === "unawarded"){
            if(project.projectStatus === "cancelled"){
                throw new Error("You can't cancel a project, once it's already cancelled");
            }
            
            console.log(project.proposals.length>0)
        if(project.proposals.length>0){
            await Promise.all(
                project.proposals.map(async (val)=>{
                    let professional = await ProfessionalsData.findOne({_id : val.professionalId}).select({professionalTotalBidPoints : 1, projectStatus : 1});
                    console.log(professional);
                    if(professional || professional !== null){
                        professional.professionalTotalBidPoints +=  0.5 * parseFloat(project.pointsNeeded);
                        console.log(professional.professionalTotalBidPoints)
                        await professional.save();
                    }
                })
            );

            project.projectStatus = "cancelled";
            await project.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Project has been cancelled successfully"});
        }
        else{
            project.projectStatus = "cancelled";
            await project.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Project has been cancelled successfully"});
        }
        }
        else{
            throw new Error("You can't cancel a project after it has been awarded");
        }
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = cancelProjectController;