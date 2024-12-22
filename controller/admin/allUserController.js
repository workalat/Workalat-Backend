let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");
const TicketsData = require("../../models/Tickets");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function allUserController(req, res){
    try{
        
        let cd = await ClientsData.find().select({
            clientFullName : 1,
            clientPictureLink  : 1,
            clientEmail  : 1,
            clientCountry : 1,
            adminAccessClient : 1,
        });
        let clientsData = cd
            .filter((val) => val?._id,) // Filter to include only valid professional reviews
            .map((val) => {
                let d = {
                    userName : val.clientFullName,
                    userPictureLink : val.clientPictureLink,
                    userEmail : val.clientEmail,
                    userCountry: val.clientCountry,
                    userStatus : val.adminAccessClient,
                    _id : val._id,
                    userType : "client",
                };
                return d; // Return the modified professionalReview object
            });
        let pd = await ProfessionalsData.find().select({
            professionalFullName : 1, 
            professionalPictureLink  : 1,
            professionalEmail  : 1,
            professionalCountry : 1,
            adminAccessProfessional : 1,
        });
        let professioanlData = pd
            .filter((val) => val?._id,) // Filter to include only valid professional reviews
            .map((val) => {
                let d = {
                    userName : val.professionalFullName,
                    userPictureLink : val.professionalPictureLink,
                    userEmail : val.professionalEmail,
                    userCountry: val.professionalCountry,
                    userStatus : val.adminAccessProfessional,
                    _id : val._id,
                    userType : "professional",
                };
                return d; // Return the modified professionalReview object
            });
        // let professioanlData = {
        //     userName : pd.professionalFullName,
        //     userPictureLink : pd.professionalPictureLink,
        //     userEmail : pd.professionalEmail,
        //     userCountry: pd.professionalCountry,
        //     _id : pd._id,
        //     userType : "professional",
        // }


        res.status(200).json({status: "success", userStatus : "SUCCESS" , data: {clientsData, professioanlData}});
        
    }
    catch(e){
        console.log("Error while showing all the leads details page.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = allUserController;