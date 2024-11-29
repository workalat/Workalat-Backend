const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");
const ProjectsData = require("../../models/Project");

async function declineProposalController(req, res){
    try{
        let projectId = req.body.projectId;
        let professoinalId = req.body.professoinalId;

        let project = await ProjectsData.findOne({_id : projectId}).select({proposals : 1, pointsNeeded : 1, maxBid : 1});
        console.log(project);
        if(project === null){
            throw new Error("No project Found.")
        }
        project.proposals = project.proposals.filter((val)=>{
            if(val.professionalId.toString() !== professoinalId){
                return(val);
            }
        });
        console.log(project);
        project.maxBid = project.maxBid + 1;
        await project.save();

        let professional = await ProfessionalsData.findOne({_id : professoinalId}).select({proposals : 1, professionalTotalBidPoints : 1});
        console.log(professional);
        if(professional === null){
            throw new Error("No Professoinal Found.")
        }
        professional.proposals = professional.proposals.filter((val)=>{
            if(val.projectId.toString() !== projectId){
                return(val);
            }
        });
        professional.professionalTotalBidPoints += project.pointsNeeded;
        await professional.save();
        
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Bid Declined Successfully."});

    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = declineProposalController;