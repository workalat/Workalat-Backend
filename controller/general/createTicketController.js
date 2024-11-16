const AdminData = require("../../models/Admin");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let TicketsData = require("../../models/Tickets");

async function createTicketController(req, res){
    try{
       let ticketDepartment = req.body.ticketDepartment;
       let ticketSubject = req.body.ticketSubject;
       let ticketRelatedProject = req.body.ticketRelatedProject;
       let ticketProjectId = req.body.ticketProjectId;
       let ticketCreatedBy = req.body.ticketCreatedBy; //client/professional/admin
       let ticketCreatorId = req.body.ticketCreatorId;
       let ticketCreatorName = req.body.ticketCreatorName; 
       let ticketStatus = req.body.ticketStatus; //active / closed / admin /customer
       let ticketMessages = req.body.ticketMessages;
       let ticketNumber;
       console.log(ticketDepartment);
       console.log(req.body);
       
       let findDepartAndGenerateId = await TicketsData.find({ticketDepartment : ticketDepartment}).countDocuments();
       if(ticketDepartment === "finance"){
        ticketNumber = `#TK/FIN-00${findDepartAndGenerateId+1}`
       }
       else if(ticketDepartment === "technical"){
        ticketNumber = `#TK/TEC-00${findDepartAndGenerateId+1}`
       }


        let message_name;
        let message_email;
        let ticketCreatorPicture;

       if(ticketCreatedBy === "client"){
            let data = await ClientsData.findOne({_id : ticketCreatorId});
            if(data === null){
                throw new Error("No User Data Found, please login again");
            }
            message_name = data.clientFullName;
            ticketCreatorPicture = data.clientPictureLink;
            message_email = "";
       }
       else if(ticketCreatedBy === "professional"){
            let data = await ProfessionalsData.findOne({_id : ticketCreatorId});
            if(data === null){
                throw new Error("No User Data Found, please login again");
            } 
            message_name = data.professionalFullName;
            ticketCreatorPicture = data.professionalPictureLink;
            message_email = "";
       }
       else{
        let data = await AdminData.findOne({_id : ticketCreatorId});
            if(data === null){
                throw new Error("No User Data Found, please login again");
            }
            message_name = data.admin_name;
            message_email = data.admin_email;
       }

       let message = {
            message_name : message_name,
            message_email : message_email,
            ticketMessages : ticketMessages,
            userId : ticketCreatorId,
            userType : ticketCreatorId,
            messageTimeStamp : Date.now()
        }
        let status = `${(ticketStatus === "admin") ? "customer" : "admin"}`

        let ticket = await TicketsData.create({
            ticketDepartment : ticketDepartment,
            ticketSubject : ticketSubject,
            ticketRelatedProject : ticketRelatedProject,
            ticketProjectId : ticketProjectId,
            ticketCreatedBy : ticketCreatedBy,
            ticketCreatorId  : ticketCreatorId,
            ticketCreatorPicture : ticketCreatorPicture,
            ticketNumber : ticketNumber,
            ticketCreatorName : message_name,
            ticketStatus : status,
            ticketMessages : message
        });

        res.status(200).json({status : "Success", userStatus : "SUCCESS", message : "Ticekt Created Successfully", ticketId : ticket._id});        
    }
    catch(e){
        console.log("Error while Creating ticket.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = createTicketController;