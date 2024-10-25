let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const TicketsData = require("../../models/Tickets");

async function findSingleTicketController(req, res){
    try{
        let ticketId = req.body.ticketId;

        let data = await TicketsData.findOne({_id : ticketId})

        if(data !== null){
            res.status(200).json({status : "succss", userStatus : "SUCCESS", data: data});
        }
        else{
            res.status(200).json({status : "succss", userStatus : "SUCCESS", data: []});
        }


    }
    catch(e){
        console.log("Error while marking fetching Dashboard Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = findSingleTicketController;