const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");
const ProjectsData = require("../../models/Project");

async function deleteProjectReviewController(req, res){
    try{
        let projectId = req.body.projectId;
        let totalRatings = req.body.totalRatings;
        let userType = req.body.userType; //client = given by client, remove professoinalReview from project and review from professional

        console.log(req.body);
        if(userType === "client"){
            let project = await ProjectsData.findOne({_id : projectId}).select({professionalReview : 1, awardedProfessionalId});
            console.log(project);
            if(project === null){
                throw new Error("Wrong Project ID");
            }
            project.professionalReview = {};
            let professional = await ProfessionalsData.findOne({_id : project.awardedProfessionalId}).select({reviews : 1,totalRatings : 1,totalReviews : 1});
            professional.totalRatings -= totalRatings;
            professional.totalReviews -= 1;
            await project.save();
            if(professional === null){
                throw new Error("Professoinal Account not found!")
            }
            professional.reviews = professional.reviews.filter((val)=>{
                if(val.projectId.toString() !== projectId){
                    return val;
                }
            });
            await professional.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Review Deleted successfully."});
        }
        else{
            
            let project = await ProjectsData.findOne({_id : projectId}).select({clientReview : 1, clientId : 1,});
            console.log(project);
            if(project === null){
                throw new Error("Wrong Project ID");
            }
            project.clientReview = {};
            let client = await ClientsData.findOne({_id : project.clientId}).select({reviews : 1, totalRatings : 1, totalReviews : 1});
            client.totalRatings -= totalRatings;
            client.totalReviews -= 1;
            await project.save();
            if(client === null){
                throw new Error("Client Account not found!")
            }
            client.reviews = client.reviews.filter((val)=>{
                if(val.projectId.toString() !== projectId){
                    return val;
                }
            });
            await client.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Review Deleted successfully."});

        }
    }
    catch(e){
        console.log("Error while Deleting Reviews Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = deleteProjectReviewController;