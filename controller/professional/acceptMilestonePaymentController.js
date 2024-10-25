let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");

async function acceptMilestonePaymentController(req, res){
    let milestoneId = req.body.milestoneId;
    let awardedId = req.body.awardedId;
    let choice = req.body.choice;
    try{
        if(choice === "accept"){
            let award = await AwardedData.findOne({_id : awardedId});
            let project = await ProjectsData.findOne({_id : award.ProjectId});

            award.milestoneDetails.filter((val)=>{
                if(val._id == milestoneId){
                val.milestoneStatusProfessional = "accepted"
                }
            });

            project.milestoneDetails.filter((val)=>{
                if(val._id == milestoneId){
                val.milestoneStatusProfessional = "accepted"
                }
            });
            
            await project.save();
            await award.save();

            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Payment Recieved Successfully"});
        }
        else{
            let award = await AwardedData.findOne({_id : awardedId});
            let project = await ProjectsData.findOne({_id : award.ProjectId});
            let professional = await ProfessionalsData.findOne({_id : award.professionalId});
    
            let milestoneAmount;
            award.milestoneDetails.filter((val)=>{
                if(val._id == session.metadata.milestoneId){
                val.milestoneStatusClient = "paid";
                val.milestoneStatusProfessional = "rejected"
                milestoneAmount = val.milestoneAmount;
                }
            });
            project.paidPrice -= parseInt(milestoneAmount);
    
            project.milestoneDetails.filter((val)=>{
                if(val._id == session.metadata.milestoneId){
                val.milestoneStatusClient = "paid";
                val.milestoneStatusProfessional = "rejected"
                milestoneAmount = val.milestoneAmount;
                }
            });
            project.paidPrice -= parseInt(milestoneAmount);
    
            professional.professionalTotalWalletAmount -= parseInt(milestoneAmount);
    
            await professional.save();
            await project.save();
            await award.save();
            
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Payment Rejected Successfully"});

        }
        
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = acceptMilestonePaymentController;