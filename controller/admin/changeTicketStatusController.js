const TicketsData = require("../../models/Tickets");

async function changeTicketStatusController(req, res){
    try{
        let ticketId = req.body.ticketId;
        let newStatus = req.body.newStatus;  //active, customer, closed

        let ticket = await TicketsData.findOne({_id : ticketId});

        if(ticket === null){
            throw new Error("No Ticket found!")
        }
        ticket.ticketStatus = newStatus;
        await ticket.save();
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Ticket status changed successfully"});
    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = changeTicketStatusController;