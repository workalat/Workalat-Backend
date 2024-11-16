const ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function showSingleLeadsBidController(req, res){
    try{
        let {projectId} = req.body;
        let data = await ProjectsData.find({_id : projectId}).select({
            clientName : 1,
            serviceLocationTown : 1,
            serviceTitle : 1,
            proposals : 1,
            clientId  :1,
            clientPictureLink : 1
        });

        let finalData = await Promise.all(data.map(async (val, i)=>{
            let clientData = await ClientsData.findOne({_id : val.clientId}).select({
                clientFullName : 1, 
                clientPictureLink : 1,
                isClientPhoneNoVerify : 1,
                isClientEmailVerify  : 1,
                kycStatus : 1
            });
            let projectWithoutProposals = { ...val._doc }; // "_doc" is used to access the actual document
            if(clientData !== null){
                projectWithoutProposals.clientName = clientData.clientFullName;
                projectWithoutProposals.clientPictureLink = clientData.clientPictureLink;
                projectWithoutProposals.verifyEmail = clientData?.isClientEmailVerify;
                projectWithoutProposals.verifyPhone =  clientData?.isClientPhoneNoVerify;
                projectWithoutProposals.verifyKyc =  clientData?.kycStatus;
            };
            projectWithoutProposals.totalProposals = val.proposals ? val.proposals.length : 0;
            return projectWithoutProposals;
    }));
        res.status(200).json({ status: "success", userStatus: "SUCCESS", data: finalData });
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showSingleLeadsBidController;