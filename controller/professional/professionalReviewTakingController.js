let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");

async function professionalReviewTakingController(req, res){
        let clientId = req.body.clientId;
        let projectId = req.body.projectId;
        let rating = req.body.rating; 
        let review = req.body.review;
    try{
        let client = await ClientsData.findOne({_id : clientId});
        let project = await ProjectsData.findOne({_id : projectId});
        let award =  await AwardedData.findOne({_id : project.awardedDetails});
        let professional =  await ProfessionalsData.findOne({_id : award.professionalId});
 
        let r = {
            giverId : professional._id,
            projectId : award.ProjectId,
            projectName : project.serviceTitle,
            giverName : professional.professionalFullName,
            giverPictureLink : professional.professionalPictureLink,
            gvierCountry : client.clientCountry,
            giverRating : rating,
            giverReview : review
        }; 

        client.reviews.push(r);
        client.totalRatings +=rating;
        project.clientReview = r;
        client.totalReviews +=1

        await client.save();
        await project.save();

        res.status(200).json({status : "success", userStatus : "SUCCESS" ,message : "Review Submitted Successfully"});

        
        
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = professionalReviewTakingController;