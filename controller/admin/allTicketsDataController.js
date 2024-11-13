let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");
const TicketsData = require("../../models/Tickets");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function addingCompletePaymentDataController(req, res){
    try{
        let data = await TicketsData.find().select({
            ticketCreatorName : 1,
            ticketCreatorPicture : 1,
            ticketNumber : 1,
            ticketStatus  : 1,
            ticketRelatedProject  : 1,
            ticketSubject : 1,
        });
        res.status(200).json({status: "success", userStatus : "SUCCESS" , data: data});
        
    }
    catch(e){
        console.log("Error while showing all the leads details page.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addingCompletePaymentDataController;