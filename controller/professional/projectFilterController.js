let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");

async function projectFilterController(req, res){
    try{
        let professionalId  = req.body.professionalId;
        let service = req.body.service; //string/keyword
        let services = req.body.services; //array
        let location = req.body.location; //array
        let minBudget = req.body.minBudget; //number
        let maxBudget = req.body.maxBudget; //number
        let timeStamp = req.body.timeStamp; //time
        let todayTimeStamp = req.body.todayTimeStamp;
        console.log(req.body);


        // Convert the input string timestamps to Date objects
        let timeStampDate = new Date(timeStamp);
        let todayTimeStampDate = new Date(todayTimeStamp);

        
        let serviceRegex = new RegExp(service, "i");
        let servicesRegexArray = services.map(skill => new RegExp(skill, "i"));

        // Fetch the professional's data
        let data = await ProfessionalsData.findOne({ _id: professionalId }).select({
            isprofessionalEmailVerify: 1,
            isprofessionalPhoneNoVerify: 1,
            professionalServiceLocPostCodes: 1,
            // professionalServiceLocCity: 1,
            professionalPrimaryService: 1,
            professionalAdditionalServices: 1,
            professionalSkills: 1,
            clientDashAccess: 1,
            professionalBio: 1,
            professionalDashAccess: 1,
            adminAccessProfessional: 1,
            proposals: 1 // Add proposals to select
        });
        if (!data) {
            throw new Error("Invalid Credentials, please login again");
        }
        let projects
        if(location.includes("nationwide") || location.length < 1 ){
            console.log("No service");
            projects = await ProjectsData.find({
                $and: [
                    // Match based on primary service or bio relevance
                    {
                        $or: [
                            { serviceNeeded: { $regex: serviceRegex } },
                            { serviceDes: { $regex: serviceRegex } },
                        ]
                    },
                    // Match based on professional skills with serviceNeeded or serviceDes using $or
                    {
                        $or: servicesRegexArray.map(skillRegex => ({
                            $or: [
                                { serviceNeeded: { $regex: skillRegex } },
                                { serviceDes: { $regex: skillRegex } }
                            ]
                        }))
                    },
                    // Filter other project criteria
                    { maxBid: { $gt: 0 } },
                    {projectMaxPrice : {$lte : maxBudget}},
                    { projectStatusAdmin: true },
                    { awardedStatus: "unawarded" },
                    {
                        projectTimeStamp: {
                            $gte: timeStampDate, // Greater than or equal to the start time (e.g., 24 hours ago)
                        }
                    },
                ]
            }).select({
                clientId: 1,
                clientName: 1,
                clientCountry: 1,
                serviceNeeded: 1,
                serviceLocationPostal: 1, 
                serviceLocationTown : 1,
                serviceTitle: 1,
                serviceDes: 1,
                pointsNeeded: 1,
                isClientEmailVerify : 1,
                isClientPhoneNoVerify : 1,
                projectTimeStamp: 1,
                proposals : 1,
                clientPictureLink: 1,
                maxBid : 1,
                projectMaxPrice : 1,
                projectUrgentStatus : 1,
                serviceLocationTown : 1
            });
        }
        else if (!service && services[0] == ''){
            if( location.length <= 1 && location[0] == ''){
                projects = await ProjectsData.find({
                    $and: [
                        // Filter other project criteria
                        { maxBid: { $gt: 0 } },
                        {projectMaxPrice : {$lte : maxBudget}},
                        { projectStatusAdmin: true },
                        { awardedStatus: "unawarded" },
                        {
                            projectTimeStamp: {
                                $gte: timeStampDate, // Greater than or equal to the start time (e.g., 24 hours ago)
                            }
                        },
                    ]
                }).select({
                    clientId: 1,
                    clientName: 1,
                    clientCountry: 1,
                    serviceNeeded: 1,
                    serviceLocationPostal: 1, 
                    serviceLocationTown : 1,
                    serviceTitle: 1,
                    serviceDes: 1,
                    pointsNeeded: 1,
                    isClientEmailVerify : 1,
                    isClientPhoneNoVerify : 1,
                    projectTimeStamp: 1,
                    proposals : 1,
                    clientPictureLink: 1,
                    maxBid : 1,
                    projectMaxPrice : 1,
                    projectUrgentStatus : 1,
                    serviceLocationTown : 1
                });
            }
            else{
                projects = await ProjectsData.find({
                    $and: [
                        // Match location based on postal codes
                        { serviceLocationPostal: { $in: location } },
                        // Filter other project criteria
                        { maxBid: { $gt: 0 } },
                        {projectMaxPrice : {$lte : maxBudget}},
                        { projectStatusAdmin: true },
                        { awardedStatus: "unawarded" },
                        {
                            projectTimeStamp: {
                                $gte: timeStampDate, // Greater than or equal to the start time (e.g., 24 hours ago)
                            }
                        },
                    ]
                }).select({
                    clientId: 1,
                    clientName: 1,
                    clientCountry: 1,
                    serviceNeeded: 1,
                    serviceLocationPostal: 1, 
                    serviceLocationTown : 1,
                    serviceTitle: 1,
                    serviceDes: 1,
                    pointsNeeded: 1,
                    isClientEmailVerify : 1,
                    isClientPhoneNoVerify : 1,
                    projectTimeStamp: 1,
                    proposals : 1,
                    clientPictureLink: 1,
                    maxBid : 1,
                    projectMaxPrice : 1,
                    projectUrgentStatus : 1,
                    serviceLocationTown : 1
                });
            }
           
        }
        else if (!service) {
            projects = await ProjectsData.find({
                $and: [
                    // // Match based on professional skills with serviceNeeded or serviceDes using $or
                    {
                        $or: servicesRegexArray.map(skillRegex => ({
                            $or: [
                                { serviceNeeded: { $regex: skillRegex } },
                                { serviceDes: { $regex: skillRegex } }
                            ]
                        }))
                    },
                    // Match location based on postal codes
                    { serviceLocationPostal: { $in: location } },
                    // Filter other project criteria
                    { maxBid: { $gt: 0 } },
                    {projectMaxPrice : {$lte : maxBudget}},
                    { projectStatusAdmin: true },
                    { awardedStatus: "unawarded" },
                    {
                        projectTimeStamp: {
                            $gte: timeStampDate, // Greater than or equal to the start time (e.g., 24 hours ago)
                        }
                    },
                ]
            }).select({
                clientId: 1,
                clientName: 1,
                clientCountry: 1,
                serviceNeeded: 1,
                serviceLocationPostal: 1, 
                serviceLocationTown : 1,
                serviceTitle: 1,
                serviceDes: 1,
                pointsNeeded: 1,
                isClientEmailVerify : 1,
                isClientPhoneNoVerify : 1,
                projectTimeStamp: 1,
                proposals : 1,
                clientPictureLink: 1,
                maxBid : 1,
                projectMaxPrice : 1,
                projectUrgentStatus : 1,
                serviceLocationTown : 1
            });

        }
        else if(services.lenght <1 && services[0] == ''){
            console.log("only services");
            projects = await ProjectsData.find({
                $and: [
                    // Match based on primary service or bio relevance
                    {
                        $or: [
                            { serviceNeeded: { $regex: serviceRegex } },
                            { serviceDes: { $regex: serviceRegex } },
                        ]
                    },
                    // Match location based on postal codes
                    { serviceLocationPostal: { $in: location } },
                    // Filter other project criteria
                    { maxBid: { $gt: 0 } },
                    {projectMaxPrice : {$lte : maxBudget}},
                    { projectStatusAdmin: true },
                    { awardedStatus: "unawarded" },
                    {
                        projectTimeStamp: {
                            $gte: timeStampDate, // Greater than or equal to the start time (e.g., 24 hours ago)
                        }
                    },
                ]
            }).select({
                clientId: 1,
                clientName: 1,
                clientCountry: 1,
                serviceNeeded: 1,
                serviceLocationPostal: 1, 
                serviceLocationTown : 1,
                serviceTitle: 1,
                serviceDes: 1,
                pointsNeeded: 1,
                isClientEmailVerify : 1,
                isClientPhoneNoVerify : 1,
                projectTimeStamp: 1,
                proposals : 1,
                clientPictureLink: 1,
                maxBid : 1,
                projectMaxPrice : 1,
                projectUrgentStatus : 1,
                serviceLocationTown : 1
            });
        }
        else{
            projects = await ProjectsData.find({
                $and: [
                    // Match based on primary service or bio relevance
                    {
                        $or: [
                            { serviceNeeded: { $regex: serviceRegex } },
                            { serviceDes: { $regex: serviceRegex } },
                        ]
                    },
                    // // Match based on professional skills with serviceNeeded or serviceDes using $or
                    {
                        $or: servicesRegexArray.map(skillRegex => ({
                            $or: [
                                { serviceNeeded: { $regex: skillRegex } },
                                { serviceDes: { $regex: skillRegex } }
                            ]
                        }))
                    },
                    // Match location based on postal codes
                    { serviceLocationPostal: { $in: location } },
                    // Filter other project criteria
                    { maxBid: { $gt: 0 } },
                    {projectMaxPrice : {$lte : maxBudget}},
                    { projectStatusAdmin: true },
                    { awardedStatus: "unawarded" },
                    {
                        projectTimeStamp: {
                            $gte: timeStampDate, // Greater than or equal to the start time (e.g., 24 hours ago)
                        }
                    },
                ]
            }).select({
                clientId: 1,
                clientName: 1,
                clientCountry: 1,
                serviceNeeded: 1,
                serviceLocationPostal: 1, 
                serviceLocationTown : 1,
                serviceTitle: 1,
                serviceDes: 1,
                pointsNeeded: 1,
                isClientEmailVerify : 1,
                isClientPhoneNoVerify : 1,
                projectTimeStamp: 1,
                proposals : 1,
                clientPictureLink: 1,
                maxBid : 1,
                projectMaxPrice : 1,
                projectUrgentStatus : 1,
                serviceLocationTown : 1
            });
        }

        // Filter out projects that already have a proposal from the professional
        let finalData;
        if(projects.length>0){
            finalData = projects.filter(project => {
                if(project.proposals.length>1){
                return !data.proposals.some(proposal => proposal.projectId = project._id); 
                }
                return(project);
             }).map(project => {
                // Create a shallow copy of the project object and delete the 'proposals' field
                let projectWithoutProposals = { ...project._doc }; // "_doc" is used to access the actual document
                delete projectWithoutProposals.proposals;
                return projectWithoutProposals;
            });
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: finalData });
        }
        else{
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: [] });
        }
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = projectFilterController;