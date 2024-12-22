let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function showSingleProjectLeadController(req, res){
    try{
        let {projectId} = req.body;
        let data = await ProjectsData.findOne({$and : [{_id : projectId}, {projectStatusAdmin : true}]}).select({
            clientId : 1,
            clientName : 1,
            kycStatus : 1,
            isPaymentVerify : 1,
            isClientPhoneNoVerify : 1,
            isClientEmailVerify : 1,
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
            projectFileURL : 1
        });
        // console.log(data);
        if(data === null){
            throw new Error("No Data Found , please login again");
        }
        else{
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: data });
        }
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showSingleProjectLeadController;