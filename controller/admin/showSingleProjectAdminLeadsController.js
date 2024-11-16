const ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function showSingleProjectLeadController(req, res){
    try{
        let {projectId} = req.body;
        let data = await ProjectsData.find({_id : projectId}).select({
            clientId : 1,
            clientName : 1,
            kycStatus : 1,
            isPaymentVerify : 1,
            isClientPhoneNoVerify : 1,
            isClientEmailVerify : 1,
            clientEmail : 1,
            clientPhoneNo : 1,
            clientPictureLink : 1,
            serviceNeeded  : 1,
            serviceLocationPostal : 1,
            serviceLocationTown : 1,
            serviceTitle : 1,
            serviceDes : 1,
            serviceFrequency : 1,
            projectQuestions : 1,
            projectMaxPrice : 1,
            projectPriceTitle : 1,
            projectUrgentStatus : 1,
            pointsNeeded : 1,
            maxBid : 1,
            projectTimeStamp : 1,
        });
        if(data.length<1){
            throw new Error("No Data Found!")
        }

        let finalData = await Promise.all(data.map(async (val, i)=>{
            let clientData = await ClientsData.findOne({_id : val.clientId}).select({
                clientFullName : 1, 
                clientPictureLink : 1,
                clientEmail  : 1,
                clientPhoneNo : 1,
                isClientEmailVerify : 1,
                isClientPhoneNoVerify : 1
            });
            let projectWithoutProposals = { ...val._doc }; // "_doc" is used to access the actual document
            if(clientData !== null){
                projectWithoutProposals.clientName = clientData.clientFullName;
                projectWithoutProposals.clientPictureLink = clientData.clientPictureLink;
                projectWithoutProposals.clientEmail = clientData.clientEmail;
                projectWithoutProposals.clientPhoneNo = clientData.clientPhoneNo;
                projectWithoutProposals.isClientEmailVerify = clientData.isClientEmailVerify;
                projectWithoutProposals.isClientPhoneNoVerify = clientData.isClientPhoneNoVerify;
            };
            return projectWithoutProposals;
    }));
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: finalData });
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showSingleProjectLeadController;