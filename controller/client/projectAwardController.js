let AwardedData = require("../../models/Awarded");
const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function projectAwardController(req, res){
    let projectConfirmAmount = req.body.projectConfirmAmount;
    let projectId  = req.body.projectId;
    let professionalId = req.body.professionalId;
    let clientId = req.body.clientId;
    console.log(req.body);
    // let milestoneTitle = req.body.milestoneTitle;
    // let milestoneAmount = req.body.milestoneAmount;
    try{
        
        let clientData = await ClientsData.findOne({_id :  clientId}).select({
            clientAwardedProjects : 1
        });
        // console.log(clientData);
        let professionalData = await ProfessionalsData.findOne({_id :  professionalId}).select({
            professionalPictureLink : 1,
            professionalFullName : 1,
            totalReviews : 1,
            totalRatings : 1,
            professionalAddress : 1,
            professionalCountry : 1,
            professionalServiceLocCity : 1,
            awardedProjects : 1,
        });
        // console.log(professionalData.awardedProjects);
        let projectData = await ProjectsData.findOne({_id :  projectId});
        console.log(projectData)

        if(projectData === null || professionalData === null || clientData === null){
            throw new Error("Some error has occured, please login again, or contact the Support Team")
        }
        else{
            
            
        if(projectData.awardedStatus  === "awarded"){
            throw new Error("This Project has been awarded already.")
        }
        else{
            // let milestone = {
            //     transactionId : "",
            //     clientId : clientId,
            //     professionalId : professionalId,
            //     milestoneTitle : milestoneTitle,
            //     milestoneAmount : milestoneAmount,
            //     milestoneStatusClient : "unpaid",
            //     milestoneStatusProfessional : "unrecieved",
            //     milestoneTimeStamp : Date.now() 
            // }
            let award = await AwardedData.create({
                professionalId : professionalId,
                clientId : clientId,
                ProjectId : projectId,
                professionalPicture : professionalData.professionalPictureLink,
                professionalName : professionalData.professionalFullName,
                professionalTotalReviews : professionalData.totalReviews,
                professionalTotalRatings :  professionalData.totalRatings,
                professionalAddress : professionalData.professionalAddress,
                professionalCountry : professionalData.professionalCountry,
                professionalCity : professionalData.professionalServiceLocCity,
                awardedStatus : "awarded",
                confirmedPrice : parseInt(projectConfirmAmount),
                paidPrice : 0,
                // milestoneDetails : milestone,
                serviceNeeded : projectData.serviceNeeded,
                serviceLocationPostal : projectData.serviceLocationPostal,
                serviceLocationTown : projectData.serviceLocationTown,
                serviceLocationCountry : projectData.serviceLocationCountry,
                serviceTitle : projectData.serviceTitle,
                serviceDes : projectData.serviceDes,
                serviceCategory : projectData.serviceCategory,
                serviceCategoryService  : projectData.serviceCategoryService,
                projectTimeStamp : projectData.projectTimeStamp,
                awardedStatusClient : "awarded",
                ProjectStatusProfessional : "pending",
                paymentCompleteStatus : "incomplete",
                awardedTimeStamp : Date.now()
            }); 
    
    
            projectData.confirmedPrice = projectConfirmAmount;
            projectData.paidPrice = 0;
            projectData.awardedId = award._id;
            projectData.awardedStatus = "awarded";
            projectData.projectStatusClient = "awarded";
            // projectData.milestoneDetails = milestone;
            projectData.awardedDetails = award._id;
            projectData.awardedTimeStamp = award.awardedTimeStamp;
            projectData.awardedProfessionalId = professionalId;
    
            clientData.clientAwardedProjects.push(award._id);
            professionalData.awardedProjects.push(award._id);
    
            await projectData.save();
            await clientData.save();
            await professionalData.save();
    
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Project Awarding Completed Successfully"});
        }
        }


        
    }
    catch(e){
        console.log("Error while doing project Awarding", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = projectAwardController;