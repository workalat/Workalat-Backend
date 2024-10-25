let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");

async function clientReviewTakingController(req, res){
        let professionalId = req.body.professionalId;
        let projectId = req.body.projectId;
        let rating = req.body.rating;
        let review = req.body.review;
    try{ 
        let professional = await ProfessionalsData.findOne({_id : professionalId});
        let project = await ProjectsData.findOne({_id : projectId});
        let award =  await AwardedData.findOne({_id : project.awardedDetails});
        let client = await ClientsData.findOne({_id : award.clientId});
 
        let r = { 
            giverId : client._id,
            projectId : award.ProjectId,
            projectName : project.serviceTitle,
            giverName :  client.clientFullName,
            giverPictureLink : client.clientPictureLink,
            gvierCountry : client.clientCountry,
            giverRating : rating,
            giverReview : review,

        };

        professional.reviews.push(r);
        professional.totalRatings +=rating;
        project.professionalReview = r;
        professional.totalReviews +=1

        await professional.save();
        await project.save();

        res.status(200).json({status : "success", userStatus : "SUCCESS" ,message : "Review Submitted Successfully"});

        
        
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = clientReviewTakingController;