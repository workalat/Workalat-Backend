let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
const TicketsData = require("../../models/Tickets");

async function ticketsDataController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType; //client/professional/admin

        let data = await TicketsData.find({ticketCreatorId : userId}).select({ticketMessages : 0});

        if(userType === "client"){
            let projects = await ProjectsData.find({ clientId: userId}).select({serviceTitle : 1});
            console.log("PRojects" , projects);
            if(projects.length > 0 || data.length > 0){
                res.status(200).json({status : "succss", userStatus : "SUCCESS", data: data, projectData :projects });
            }
            else{
                res.status(200).json({status : "succss", userStatus : "SUCCESS", data: [], projectData : []});
            }
        }
        else if(userType === "professional"){ 
            let projects = await ProjectsData.find({ awardedProfessionalId: userId}).select({serviceTitle : 1});
            if(projects.length > 0 || data.length > 0){
                res.status(200).json({status : "succss", userStatus : "SUCCESS", data: data, projectData :projects });
            }
            else{
                res.status(200).json({status : "succss", userStatus : "SUCCESS", data: [], projectData : []});
            }
        }
        else{
            if(data.length > 0){
            res.status(200).json({status : "succss", userStatus : "SUCCESS", data: data });
        }
        else{
            res.status(200).json({status : "succss", userStatus : "SUCCESS", data: []});
        }
        }
    }
    catch(e){
        console.log("Error while marking fetching Dashboard Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = ticketsDataController;