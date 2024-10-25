let ClientsData = require("../../models/Client");
let ProjectsData = require("../../models/Project");

async function postProjectController(req, res){
    try{

        let userId = req.body.userId;
        let serviceNeeded = req.body.serviceNeeded; //service
        let serviceCategory = req.body.serviceCategory; //category
        let serviceLocationPostal = req.body.serviceLocationPostal;
        let serviceQuestions = req.body.serviceQuestions;
        let serviceLocationTown = req.body.serviceLocationTown;
        let serviceFrequency = req.body.serviceFrequency;
        let serviceFrequencyDays = req.body.serviceFrequencyDays;
        let projectPriceString = req.body.projectPriceString; //0-150 , 0-500
        let projectMaxPrice = req.body.projectMaxPrice; //150,500,250,30001
        let projectPriceTitle = req.body.projectPriceTitle; //"Small project ($3000 or above)"
        let projectUrgentStatus = req.body.projectUrgentStatus; // urgent,flexible/later/planning & researching
        let pointsNeeded = req.body.pointsNeeded;
        let serviceTitle = req.body.serviceTitle;
        let serviceDes = req.body.serviceDes;
        console.log(req.body.serviceLocationTown);

        let userData= await ClientsData.findOne({_id: userId}).select({
            clientFullName : 1,
            clientPhoneNo : 1,
            clientEmail : 1,
            isClientEmailVerify : 1,
            isClientPhoneNoVerify : 1,
            clientCountry : 1,
            clientPictureLink : 1,
            clientProjects : 1,
            clientChatId : 1,
            clientTotalProjects : 1,
            kycStatus : 1,
            isPaymentVerify : 1,
            });
            console.log(userData);

        let projectData= await ProjectsData.create({
            clientId : userData._id, 
            clientName : userData.clientFullName,
            clientPhoneNo : userData.clientPhoneNo,
            clientEmail : userData.clientEmail,
            isClientPhoneNoVerify : userData.isClientPhoneNoVerify,
            isClientEmailVerify : userData.isClientEmailVerify,
            clientPictureLink : userData.clientPictureLink,
            clientCountry : userData.clientCountry,
            projectPriceString : projectPriceString,
            projectMaxPrice : projectMaxPrice,
            serviceCategory : serviceCategory,
            serviceNeeded : serviceNeeded,
            serviceLocationPostal: serviceLocationPostal,
            serviceLocationTown: serviceLocationTown,
            serviceFrequency: serviceFrequency,
            serviceFrequencyDays: serviceFrequencyDays,
            projectQuestions : serviceQuestions,
            projectUrgentStatus : projectUrgentStatus,
            serviceTitle : serviceTitle,
            serviceDes : serviceDes,
            projectPriceTitle : projectPriceTitle,
            pointsNeeded : pointsNeeded,
            clientChatId : userData.clientChatId,
            kycStatus : userData.kycStatus,
            isPaymentVerify : userData.isPaymentVerify,
        });
        // console.log(projectData);
        userData.clientProjects.push(projectData._id);
        userData.clientTotalProjects += 1;
        await userData.save();
        res.status(200).json({status : "success", userStatus : "SUCCESS", projectId :  projectData._id,message : "Project has been posted successfully"});
    }
    catch(e){
        console.log("Error while posting project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = postProjectController;