const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
async function broadCastRecipientsController(req, res){
    try{
       
        let professionalData = await ProfessionalsData.find({}).select({professionalFullName : 1, professionalEmail : 1});

        let clientData =  await ClientsData.find({}).select({clientFullName : 1, clientEmail : 1});

          // Filter and transform professional data
        const finalProfessional = professionalData
            .filter(
            (val) =>
                val?.professionalFullName &&
                val?.professionalEmail // Ensure fields are not empty
            )
            .map((val) => ({
            userId: val._id,
            userName: val.professionalFullName,
            userEmail: val.professionalEmail,
            userType : "professional"
            }));

                // Filter and transform client data
            const finalClient = clientData
            .filter(
            (val) =>
                val?.clientFullName &&
                val?.clientEmail // Ensure fields are not empty
            )
            .map((val) => ({
            userId: val._id,
            userName: val.clientFullName,
            userEmail: val.clientEmail,
            userType : "client"
            }));

        res.status(200).json({status : "success", userStatus : "SUCCESS", message : `Data Found Successfully`, data : {clientData : finalClient, professionalData : finalProfessional}});

    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = broadCastRecipientsController;