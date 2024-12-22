const AdminFeaturesData = require("../../models/AdminFeatures");
const AwardedData = require("../../models/Awarded");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function markAsCompletedController(req, res) {
    try {
        let userId = req.body.userId;
        let userType = req.body.userType;
        let projectId = req.body.projectId;

        if(userType === "client"){
            //Checking projects
            let project = await ProjectsData.findOne({$and : [{_id : projectId}, {awardedStatus : "awarded"}]});
            let rank = await AdminFeaturesData.findOne({}).select({ranking : 1});
            if(project === null){
                throw new Error("Wrong credentials, please login again");
            };
            if(project.projectStatusClient === "completed"){
                throw new Error("Already Marked.");
            }

            let data = await ClientsData.findOne({_id : userId});
            let professional = await ProfessionalsData.findOne({_id : project.awardedProfessionalId})
            if(data === null){
                throw new Error("Wrong credentials, please login again");
            }
            if(professional === null){
                throw new Error("No professional Account present. The professional may have deleted his account");
            }
            
            let awarded = await AwardedData.findOne({_id : project.awardedId});
             
            project.projectStatusClient = "completed";
            awarded.awardedStatusClient = "completed";
            
            if(project.projectStatusClient === "completed" && project.projectStatusProfessional==="completed"){
                project.projectStatus = "completed";
                professional.totalProjectsCompleted +=1;
                data.totalProjectsCompleted +=1;

                if(professional.totalProjectsCompleted >= 0 && professional.totalProjectsCompleted <  rank.ranking.level_1){
                    professional.professional_level = "1";
                }
                if(professional.totalProjectsCompleted >= rank.ranking.level_1 && professional.totalProjectsCompleted < rank.ranking.level_2){
                    professional.professional_level = "2";
                }
                if(professional.totalProjectsCompleted >= rank.ranking.level_2 && professional.totalProjectsCompleted < rank.ranking.level_3){
                    professional.professional_level = "3";
                }
                if(professional.totalProjectsCompleted >= rank.ranking.level_3 && professional.totalProjectsCompleted < rank.ranking.level_4){
                    professional.professional_level = "4";
                }
                if(professional.totalProjectsCompleted > rank.ranking.level_4 && professional.totalProjectsCompleted >= rank.ranking.level_pro){
                    professional.professional_level = "5";
                }
            }
            
            if(awarded.awardedStatusClient === "completed" && awarded.ProjectStatusProfessional==="completed"){
                awarded.projectStatus = "completed";
            }
            await project.save();
            await awarded.save();
            await professional.save();
            await data.save();

            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Status updated to completed successfully", currentStatus : project.projectStatusClient});
        }
        else{

            
            let project = await ProjectsData.findOne({$and : [{_id : projectId}, {awardedStatus : "awarded"}]});
            if(project === null){
                throw new Error("Wrong credentials, please login again");
            };
            
            if(project.projectStatusProfessional === "completed"){
                throw new Error("You can not Mark as completed, once it has already been completed.");
            }


            let data = await ProfessionalsData.findOne({_id : userId});
            let client = await ClientsData.findOne({_id : project.clientId});

            if(data === null){
                throw new Error("Wrong credentials, please login again");
            }

            if(client === null){
                throw new Error("No Client Account present. The Client may have deleted his account");
            }


            let awarded = await AwardedData.findOne({_id : project.awardedId});
            
            project.projectStatusProfessional = "completed";
            awarded.projectStatusProfessional = "completed";
            
            if(project.projectStatusClient === "completed" && project.projectStatusProfessional==="completed"){
                project.projectStatus = "completed";
                data.totalProjectsCompleted +=1;
                client.totalProjectsCompleted +=1;

                // if(data.totalProjectsCompleted >= 50 && data.totalProjectsCompleted <= 80){
                //     data.professional_level = "2";
                // }
                // if(data.totalProjectsCompleted >= 80 && data.totalProjectsCompleted <= 100){
                //     data.professional_level = "3";
                // }
                // if(data.totalProjectsCompleted >= 100 && data.totalProjectsCompleted <= 150){
                //     data.professional_level = "4";
                // }
                // if(data.totalProjectsCompleted >= 150){
                //     data.professional_level = "5";
                // }

                if(data.totalProjectsCompleted >= 0 && data.totalProjectsCompleted <  rank.ranking.level_1){
                    data.professional_level = "1";
                }
                if(data.totalProjectsCompleted >= rank.ranking.level_1 && data.totalProjectsCompleted < rank.ranking.level_2){
                    data.professional_level = "2";
                }
                if(data.totalProjectsCompleted >= rank.ranking.level_2 && data.totalProjectsCompleted < rank.ranking.level_3){
                    data.professional_level = "3";
                }
                if(data.totalProjectsCompleted >= rank.ranking.level_3 && data.totalProjectsCompleted < rank.ranking.level_4){
                    data.professional_level = "4";
                }
                if(data.totalProjectsCompleted > rank.ranking.level_4 && data.totalProjectsCompleted >= rank.ranking.level_pro){
                    data.professional_level = "5";
                }
                }
            
                if(awarded.awardedStatusClient === "completed" && awarded.ProjectStatusProfessional==="completed"){
                    awarded.projectStatus = "completed";
                }
                await project.save();
                await awarded.save();
                await data.save();
                await client.save();

            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Status updated to completed successfully", currentStatus : project.projectStatusProfessional});
        }

    }
    catch (e) {
        console.log("Error while Marking as completed. ", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};


module.exports = markAsCompletedController;