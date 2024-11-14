let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");

async function projectHistoryController(req, res){
    try{ 
        let {clientId} = req.body;
        let userId = req.body.userId;
        let userType = req.body.userType;
        if(userType === "client"){
            let projectsData= await ProjectsData.find({clientId : userId}).select({
                serviceNeeded  : 1,
                serviceLocationPostal : 1,
                projectStatusProfessional : 1,
                projectStatus : 1,
                projectTimeStamp  : 1, 
                serviceLocationTown : 1,
                awardedStatus : 1,
                projectStatusAdmin : 1,
                confirmedPrice : 1, 
                projectPriceTitle : 1
            });
    
            console.log(projectsData)
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});
        }
        else{
            let projectsData= await ProjectsData.find({awardedProfessionalId : userId}).select({
                serviceNeeded  : 1,
                projectStatusClient : 1,
                serviceLocationPostal : 1,
                projectStatus : 1,
                projectTimeStamp  : 1, 
                serviceLocationTown : 1,
                awardedStatus : 1,
                confirmedPrice : 1,
            });
    
            console.log(projectsData)
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});

        }
    }
    catch(e){
        console.log("Error while fetching projects project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = projectHistoryController;