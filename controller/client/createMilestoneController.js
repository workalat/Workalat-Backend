let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");

async function createMilestoneController(req, res){
    try{
        let clientId = req.body.clientId;
        let awardedId = req.body.awardedId;
        let milestoneTitle = req.body.milestoneTitle;
        let milestoneAmount = req.body.milestoneAmount;

        let award = await AwardedData.findOne({_id : awardedId});
        let project = await ProjectsData.findOne({_id : award.ProjectId});

        if( milestoneAmount< award.confirmedPrice - award.paidPrice ){
                let milestone = {
                transactionId : "",
                clientId : clientId,
                professionalId : award.professionalId,
                milestoneTitle : milestoneTitle,
                milestoneAmount : milestoneAmount,
                milestoneStatusClient : "unpaid",
                milestoneStatusProfessional : "unrecieved",
                milestoneTimeStamp : Date.now(),
                transactionTimeStamp : null
            };
            award.milestoneDetails.push(milestone);
            project.milestoneDetails.push(milestone);

            await award.save();
            await project.save();

            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Miletone created successfully"});
        }
        else{
            res.status(400).json({status : "fail", userStatus : "FAILED", message : "You are trying to pay more amount than the left amount of the project"});
        }
        

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = createMilestoneController;