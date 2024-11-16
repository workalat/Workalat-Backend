let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");
const AdminData = require("../../models/Admin");
const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const TicketsData = require("../../models/Tickets");

async function respondTicketController(req, res){
    try{
        let ticketId = req.body.ticketId;
        let userId = req.body.userId;
        let userType = req.body.userType;  // client/professional/admin
        let ticketStatus = req.body.ticketStatus; //closed/admin/customer  // if admin is sending messsage, then it's admin, else it's customer
        let userMessage = req.body.userMessage;

        let message_name;
        let message_email;
        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId});
            
            if(data === null){
                throw new Error("No User Data Found, please login again");
            }

            message_name = data.clientFullName;
            message_email = "";
        }
        else if(userType === "professional"){
            let data = await ProfessionalsData.findOne({_id : userId});
            if(data === null){
                throw new Error("No User Data Found, please login again");
            }
            message_name = data.professionalFullName;
            message_email = "";
        }
        else{
            let data = await AdminData.findOne({_id : userId});
            if(data === null){
                throw new Error("No User Data Found, please login again");
            }
            message_name = data.admin_name;
            message_email = data.admin_email;
       }
       
       
        let message = {
            message_name : message_name,
            message_email : message_email,
            ticketMessages : userMessage,
            messageTimeStamp : Date.now(),
            userId : userId,
            userType : userType
        }
        let status = `${(ticketStatus === "admin") ? "customer" : "admin"}`

        let ticket = await TicketsData.findOne({_id : ticketId});

        if(ticket.ticketStatus === "closed"){
            throw new Error("You can not respond to a Ticekt, when it has been closed");
        }
        ticket.ticketStatus = status;
        ticket.ticketMessages.push(message);

        await ticket.save();
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Ticket response submitted successfully", ticketStatus : status});
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = respondTicketController;