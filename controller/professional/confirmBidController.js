let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
async function confirmBidController(req, res){
    let professionalId = req.body.professionalId;
    let projectId = req.body.projectId;
    let proposal = req.body.proposal;
    let proposalType = req.body.proposalType;  //points / leads
    try{
        let professional = await ProfessionalsData.findOne({_id : professionalId});
        // console.log(professional);
        if(professional === null){
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "Data Not Found", data: null});
        }
        let projectData= await ProjectsData.findOne({_id : projectId}).select({
            proposals : 1, 
            serviceNeeded : 1,
            serviceTitle : 1,
            serviceDes : 1,
            serviceLocationPostal : 1,
            serviceLocationTown : 1,
            clientId : 1,
            clientName : 1,
            clientEmail : 1,
            clientPhoneNo : 1,
            maxBid : 1,
            clientChatId : 1,
            pointsNeeded : 1,
            isClientPhoneNoVerify : 1,
            isClientEmailVerify : 1,
            clientPictureLink : 1,
            kycStatus : 1
        });
        if(projectData === null || professional === null){
            throw new Error("Data Not Found")
        }

        if(projectData.maxBid === 0){
            throw new Error("The total Bids limit on this project has been reached.")
        }
        else{
            if(proposalType === "points"){
                if(professional.professionalTotalBidPoints >= projectData.pointsNeeded){
                    let d = {
                        projectId : projectId,
                        professionalPicture : professional.professionalPictureLink,
                        professionalId : professionalId,
                        professionalName : professional.professionalFullName,
                        professionalTotalReviews : professional.totalReviews,
                        professionalTotalRatings : professional.totalRatings,
                        professionalChatId : professional.professionalChatId,
                        awardedStatusClient : "unawarded",
                        bidTimeStamp : Date.now(),
                        proposal : proposal
                    }
                    let pd = {
                        projectId : projectId,
                        projectServiceNeeded : projectData.serviceNeeded,
                        projectTitle : projectData.serviceTitle,
                        projectDes : projectData.serviceDes,
                        projectPostalCode : projectData.serviceLocationPostal,
                        projectCity : projectData.serviceLocationTown,
                        professionalId : professionalId,
                        professionalName  : professional.professionalFullName,
                        professionalProposalDes : proposal,
                        clientId : projectData.clientId,
                        clientName : projectData.clientName,
                        clientEmail : projectData.clientEmail,
                        clientPhoneNo  : projectData.clientPhoneNo,
                        clientChatId : projectData.clientChatId
                    }
                    projectData.proposals.push(d);
                    projectData.maxBid -= 1;
                    professional.proposals.push(pd);
                    professional.professionalTotalBidPoints = professional.professionalTotalBidPoints - parseFloat(projectData.pointsNeeded);
                    // console.log(professional.professionalTotalBidPoints,bidAmount );
                    await projectData.save();
                    await professional.save();
                    res.json({status : "success", userStatus : "SUCCESS" ,message : "Bid Submitted Successfully",data: [{
                        serviceTitle : projectData.serviceTitle,
                        serviceDes : projectData.serviceDes,
                        clientId : projectData.clientId,
                        clientName : projectData.clientName,
                        clientEmail : projectData.clientEmail,
                        clientPhoneNo  : projectData.clientPhoneNo,
                        clientChatId : projectData.clientChatId,
                        isClientPhoneNoVerify : projectData.isClientPhoneNoVerify,
                        isClientEmailVerify : projectData.isClientEmailVerify,
                        clientPictureLink : projectData.clientPictureLink,
                        kycStatus : projectData.kycStatus
                    }]});
                }
                else{
                    throw new Error("You don't have sufficient bid points to apply on the project")
                }
            }
            else{
                console.log("leads")
                // console.log(professional.membershipLeads >0 && professional.isMembership === true && professional.membershipStatus === "active")
                if(professional.membershipLeads >0 && professional.isMembership === true && professional.membershipStatus === "active"){
                    let d = {
                        projectId : projectId,
                        professionalPicture : professional.professionalPictureLink,
                        professionalId : professionalId,
                        professionalName : professional.professionalFullName,
                        professionalTotalReviews : professional.totalReviews,
                        professionalTotalRatings : professional.totalRatings,
                        professionalChatId : professional.professionalChatId,
                        awardedStatusClient : "unawarded",
                        bidTimeStamp : Date.now(),
                        proposal : proposal
                    }
                    let pd = {
                        projectId : projectId,
                        projectServiceNeeded : projectData.serviceNeeded,
                        projectTitle : projectData.serviceTitle,
                        projectDes : projectData.serviceDes,
                        projectPostalCode : projectData.serviceLocationPostal,
                        projectCity : projectData.serviceLocationTown,
                        professionalId : professionalId,
                        professionalName  : professional.professionalFullName,
                        professionalProposalDes : proposal,
                        clientId : projectData.clientId,
                        clientName : projectData.clientName,
                        clientEmail : projectData.clientEmail,
                        clientPhoneNo  : projectData.clientPhoneNo,
                        clientChatId : projectData.clientChatId
                    }
                    projectData.proposals.push(d);
                    projectData.maxBid -= 1;
                    professional.membershipLeads -= 1;
                    professional.proposals.push(pd);
                    // professional.professionalTotalBidPoints = professional.professionalTotalBidPoints - parseFloat(projectData.pointsNeeded);
                    // console.log(professional.professionalTotalBidPoints,bidAmount );
                    await projectData.save();
                    await professional.save();
                    console.log(projectData.proposals);
                    console.log(projectData.membershipLeads);
                    console.log(professional.proposals);
                    res.json({status : "success", userStatus : "SUCCESS" ,message : "Bid Submitted Successfully",data: [{
                        serviceTitle : projectData.serviceTitle,
                        serviceDes : projectData.serviceDes,
                        clientId : projectData.clientId,
                        clientName : projectData.clientName,
                        clientEmail : projectData.clientEmail,
                        clientPhoneNo  : projectData.clientPhoneNo,
                        clientChatId : projectData.clientChatId,
                        isClientPhoneNoVerify : projectData.isClientPhoneNoVerify,
                        isClientEmailVerify : projectData.isClientEmailVerify,
                        clientPictureLink : projectData.clientPictureLink,
                        kycStatus : projectData.kycStatus
                    }]});
                }
                else{
                    throw new Error("Your membership has been end, please activate your membership")
                }

            }

            
            
        }
    }
    catch(e){
        console.log("Error while adding Confirming bid", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = confirmBidController;