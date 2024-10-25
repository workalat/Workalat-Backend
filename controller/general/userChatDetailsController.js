let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
const TicketsData = require("../../models/Tickets");

async function userChatDetailsController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType; 

        console.log(req.body);


        if(userType === "client"){
            let client = await ClientsData.findOne({_id : userId}).select({
                clientFullName : 1,
                activeChat  : 1,
                chatNotifications : 1,
                clientEmail : 1,
                clientPictureLink : 1
            });
            if(client === null){
                throw new Error("No User Found.")
            }
            else{
                res.status(200).json({status : "success", userStatus : "SUCCESS", data : {      
                    id : client._id,
                    email : client.clientEmail,
                    username : client.clientFullName,
                    avatar : client.clientPictureLink,
                    activeChat : client.activeChat,
                    chatNotifications : client.chatNotifications
                }});
            }
        }
        else if(userType === "professional"){ 
            let professional = await ProfessionalsData.findOne({_id : userId}).select({
                professionalFullName : 1,
                activeChat  : 1,
                chatNotifications : 1,
                professionalEmail : 1,
                professionalPictureLink : 1
            });
            console.log(professional);
            if(professional === null){
                throw new Error("No User Found.")
            }
            else{
                res.status(200).json({status : "success", userStatus : "SUCCESS", data : {
                    id : professional._id,
                    email : professional.professionalEmail,
                    username : professional.professionalFullName,
                    avatar : professional.professionalPictureLink,
                    activeChat : professional.activeChat,
                    chatNotifications : professional.chatNotifications
                }});
            }
         
        }
    }
    catch(e){
        console.log("Error while marking fetching Dashboard Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = userChatDetailsController;