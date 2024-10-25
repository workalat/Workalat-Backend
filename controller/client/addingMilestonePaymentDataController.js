let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function addingMilestonePaymentDataController(req, res){
    let sessionId = req.body.sessionId;
    try{       
        let session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log(session);

        let award = await AwardedData.findOne({_id : session.metadata.awardedId});
        let project = await ProjectsData.findOne({_id : award.ProjectId});
        let professional = await ProfessionalsData.findOne({_id : award.professionalId});
        let client = await ClientsData.findOne({_id : award.clientId});

        

        award.milestoneDetails.filter((val)=>{
            console.log(val._id == session.metadata.milestoneId)
            if(val._id == session.metadata.milestoneId){
                val.transactionId = sessionId;
                val.milestoneStatusClient = "paid";
                val.transactionTimeStamp = Date.now();
                val.milestoneStatusProfessional = "pending"
            }
        });
        
        award.paidPrice += parseInt(session.metadata.milestoneAmount);

        project.milestoneDetails.filter((val)=>{
            if(val._id == session.metadata.milestoneId){
                val.transactionId = sessionId;
                val.milestoneStatusClient = "paid";
                val.transactionTimeStamp = Date.now();
                val.milestoneStatusProfessional = "pending"
        }
        });
        
        project.paidPrice += parseInt(session.metadata.milestoneAmount);

        professional.professionalTotalWalletAmount += parseInt(session.metadata.milestoneAmount);

        client.totalAmountSpend += parseInt(session.metadata.milestoneAmount);

        await award.save();
        await project.save();
        await professional.save();
        await client.save();


        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Payment Data saved Successfully"});
        
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addingMilestonePaymentDataController;