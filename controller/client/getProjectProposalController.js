let ProjectsData = require("../../models/Project");

async function getProjectProposalController(req, res){
    try{
        let {projectId} = req.body;
        let projectsData= await ProjectsData.findOne({_id : projectId}).select({
            proposals : 1
        });
        
        if(projectsData === null){
            res.status(200).json({status : "fail", userStatus : "FAILED", message : "No Proposals data Found", data: []});
        }
        else{
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: projectsData});
        }
    }
    catch(e){
        console.log("Error while fetching projects project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }

};

module.exports = getProjectProposalController;