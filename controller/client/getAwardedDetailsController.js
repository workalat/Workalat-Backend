const ProjectsData = require("../../models/Project");
let ProfessionalsData = require("../../models/Professional");

async function getAwardedDetailsController(req, res){
    try{
        let {clientId} = req.body;
        console.log(clientId)
        let projectsData= await ProjectsData.find({$and: [{projectStatus : "active"}, {clientId : clientId}] }).select({
            professionalId : 1,
            ProjectId : 1,
            professionalName : 1,
            awardedStatus  : 1, 
            serviceDes : 1, 
            serviceLocationPostal : 1,
            serviceLocationTown : 1,
            serviceTitle  : 1,
            projectTimeStamp  : 1, 
            projectStatusClient : 1,
            projectStatusAdmin : 1,
            projectStatusProfessional : 1,
            projectStatus : 1,
            serviceNeeded : 1,
            awardedProfessionalId : 1 
        });

        let finalData = await Promise.all(projectsData.map(async (val, i)=>{
            if(val.awardedProfessionalId.length > 0){
                let professionalData = await ProfessionalsData.findOne({_id : val.awardedProfessionalId}).select({
                    professionalFullName : 1,
                    professionalPictureLink : 1,
                });
                let updatedData = { ...val._doc }; // "_doc" is used to access the actual document
                if(professionalData !== null){
                    updatedData.awardedProfessionalFullName = professionalData.professionalFullName;
                    updatedData.awardedProfessionalPictureLink = professionalData.professionalPictureLink;
                    return updatedData;
                };
            }
            return(val);
    }));
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: finalData});
    }
    catch(e){
        console.log("Error while fetching projects project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = getAwardedDetailsController;