let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function addingCompletePaymentDataController(req, res){
    try{
        let sessionId = req.body.sessionId;

        let session = await stripe.checkout.sessions.retrieve(sessionId);

        
        let award = await AwardedData.findOne({_id : session.metadata.awardedId});
        let project = await ProjectsData.findOne({_id : award.ProjectId});
        let client = await ClientsData.findOne({_id : award.clientId});
        let professional = await ProfessionalsData.findOne({_id : award.professionalId});

        let milestone = {
            transactionId : sessionId,
            clientId : award.clientId,
            professionalId : award.professionalId,
            milestoneTitle : "Complete Payment of Project",
            milestoneAmount : session.metadata.amount,
            milestoneStatusClient : "paid",
            milestoneStatusProfessional : "accepted",
            milestoneTimeStamp : Date.now(),
            transactionTimeStamp : Date.now()
        };

        award.milestoneDetails.push(milestone);
        award.paidPrice += parseInt(session.metadata.amount);
        award.paymentCompleteStatus = "complete";

        project.milestoneDetails.push(milestone);
        project.paidPrice += parseInt(session.metadata.amount);
        project.projectStatusProfessional = "complete";
        

        professional.professionalTotalWalletAmount += parseInt(session.metadata.amount);

        client.totalAmountSpend += parseInt(session.metadata.amount);

        await award.save();
        await project.save();
        await professional.save();
        await client.save();

        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Complete Payment Data Saved Successfully"});


    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addingCompletePaymentDataController;