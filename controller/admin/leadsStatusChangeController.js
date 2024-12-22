const ProjectsData = require("../../models/Project");

async function leadsStatusChangeController(req, res){
    try{
        let projectId = req.body.projectId;
        let choice = req.body.choice; //true/false
        
        let project = await ProjectsData.findOne({_id : projectId}).select({projectStatusAdmin : 1,projectStatusAdminString : 1});
        project.projectStatusAdmin = choice;
        project.projectStatusAdminString = choice ? "approved" : "rejected";
        await project.save();
        res.status(200).json({ status: "success", userStatus: "SUCCESS", message : `Project status changed to ${choice ? "Approved" : "Rejected"}`});
    }
    catch(e){ 
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = leadsStatusChangeController;