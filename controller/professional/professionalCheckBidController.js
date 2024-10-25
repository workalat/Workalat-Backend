let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
async function professionalCheckBidController(req, res){
    let userId = req.body.userId;
    let projectId = req.body.projectId;
    try{
        let data = await ProfessionalsData.findOne({_id: userId}).select({
            professionalTotalBidPoints : 1,
            payAsGo : 1,
            isprofessionalBidAccess : 1,
            adminAccessProfessional : 1,
            membershipLeads : 1,
            isMembership : 1
        });
        let project = await ProjectsData.findOne({_id : projectId}).select({ serviceTitle : 1 ,proposals : 1, maxBid : 1, clientName : 1, pointsNeeded : 1});

        if(project === null || data === null){
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "No Data Found", data: null, eligible : false})
        }
        else{
            let eligible = true;
        if(project.proposals.length>0){
            let verify = project.proposals.map((val)=>{
                console.log(val.professionalId === userId)
                if(val.professionalId === userId){
                    eligible = false;
                    return 0;
                    }
            });
        }
        if(project.maxBid === 0){
            eligible  = false;
        }
        if(data === null){
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "User Data Not Found", projectAvailableBids : null ,data: null, eligible : false, clientName : "", pointsNeeded : 0, projectId : ""})
        }
        res.status(200).json({status : "success", userStatus : "SUCCESS" ,message : "Data Found", projectAvailableBids  : project.maxBid ,data: data,eligible : eligible, clientName : project.clientName, pointsNeeded : project.pointsNeeded, projectId : project._id, projectTitle : project.serviceTitle});
        }
        
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message, eligible : false});
    }
};

module.exports = professionalCheckBidController;