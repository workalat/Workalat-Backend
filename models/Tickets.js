require("dotenv").config();
let mongoose = require("mongoose");


let TicketsSchema  = new mongoose.Schema({
    ticketDepartment : {
        type : String,
        default : ""
    },
    ticketSubject : {
        type : String,
        default : ""
    },
    ticketRelatedProject : {
        type : String,
        default : ""
    },
    ticketProjectId : {
        type : String,
        default : ""
    },
    ticketCreatedBy : { //client/professional/admin
        type : String,
        default : ""
    },
    ticketCreatorName : {
        type : String,
        default : ""
    },
    ticketCreatorId : {
        type : String,
        default : ""
    },
    ticketStatus : {
        type : String,
        default : ""   //active / closed / onClient / onProfessional / onAdmin
    },
    ticketTimeStamp : {
        type : Date,
        default : Date.now()
    },
    ticketMessages: {
        type : Array,
        default : []
    }

    
},{
    timestamps : true
})


let TicketsData =  new mongoose.model("Ticket", TicketsSchema);

module.exports = TicketsData;