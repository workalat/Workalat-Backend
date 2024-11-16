let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");
const TicketsData = require("../../models/Tickets");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function allTicketsDataController(req, res){
    try{
        let data = await TicketsData.find().select({
            ticketCreatorName : 1,
            ticketCreatorPicture : 1,
            ticketNumber : 1,
            ticketStatus  : 1,
            ticketRelatedProject  : 1,
            ticketSubject : 1,
        });

        let finalData = await Promise.all(data.map(async (val, i)=>{
            console.log(val);
            if(val.ticketCreatedBy === "client"){
                let clientData = await ClientsData.findOne({_id : val.ticketCreatorId}).select({
                    clientFullName : 1, 
                    clientPictureLink : 1,
                });
                let updateData = { ...val._doc }; // "_doc" is used to access the actual document
                if(clientData !== null){
                    updateData.ticketCreatorName = clientData.clientFullName;
                    updateData.ticketCreatorPicture = clientData.clientPictureLink;
                };
                return projectWithoutProposals;
            }
            else if(val.ticketCreatedBy === "professional"){
                let professionalData = await ProfessionalsData.findOne({_id : val.ticketCreatorId}).select({
                    professionalFullName : 1, 
                    professionalPictureLink : 1,
                });
                let updateData = { ...val._doc }; // "_doc" is used to access the actual document
                if(professionalData !== null){
                    updateData.ticketCreatorName = professionalData.professionalFullName;
                    updateData.ticketCreatorPicture = professionalData.professionalPictureLink;
                };
                return projectWithoutProposals;
            }
            else{
                return (val)
            }
    }));


        res.status(200).json({status: "success", userStatus : "SUCCESS" , data: finalData});
        
    }
    catch(e){
        console.log("Error while showing all the leads details page.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = allTicketsDataController;