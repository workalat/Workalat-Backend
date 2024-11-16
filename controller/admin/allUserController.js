let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");
const TicketsData = require("../../models/Tickets");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function allUserController(req, res){
    try{
        
        let clientsData = await ClientsData.find().select({
            clientFullName : 1,
            clientPictureLink  : 1,
            clientEmail  : 1,
            clientCountry : 1,
        });
        let professioanlData = await ProfessionalsData.find().select({
            professionalFullName : 1,
            professionalPictureLink  : 1,
            professionalEmail  : 1,
            professionalCountry : 1,
        });


        res.status(200).json({status: "success", userStatus : "SUCCESS" , data: {clientsData, professioanlData}});
        
    }
    catch(e){
        console.log("Error while showing all the leads details page.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = allUserController;