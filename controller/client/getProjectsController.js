let ProjectsData = require("../../models/Project");

async function getProjectsController(req, res){
    try{
        let {clientId} = req.body;
        let projectsData= await ProjectsData.find({clientId : clientId}).select({
            serviceNeeded: 1,
            serviceLocationPostal : 1,
            serviceLocationTown : 1,
            projectTimeStamp : 1,
            serviceTitle : 1, 
            serviceDes : 1,
            projectStatusAdmin: 1
        });
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});
    }
    catch(e){
        console.log("Error while fetching projects project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});

    }

};


module.exports = getProjectsController ;