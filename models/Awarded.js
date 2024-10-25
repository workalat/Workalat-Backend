require("dotenv").config();
let mongoose = require("mongoose");


let AwardedProjectsSchema  = new mongoose.Schema({
    professionalId : {
        type : String
    },
    clientId: {
        type: String, 
   },
   ProjectId : {
    type : String
   },
   isProfessionalPicture: {
    type : Boolean,
    default : false
    },
   professionalPicture : {
    type : String,
    default : ""
    },
    professionalName : {
        type : String,
        default : ""
    },
    professionalUsername : {
        type : String,
        default : ""
    },
    professionalTotalReviews: {
        type : Number,
        default : 0
    },
    professionalTotalRatings: {
        type : Number,
        default : 0
    },
    professionalAddress : {
        type : String,
        default : ""
    },
    professionalCountry : {
        type : String,
        default : ""
    },
    professionalCity : {
        type : String,
        default : ""
    },
    awardedStatus : {
        type : String,
        default : "unawarded"
    },
    professionalOfferPrice: {
        type : Number,
        default : 0 
    },
    confirmedPrice : {
        type : Number,
        default : null
    },
    paidPrice : {
        type : Number,
        default : 0
    },
    requestReleaseProfessional : {
        type : Boolean,
        default : false
    },
    milestoneDetails : [{
       transactionId : {type : String, default : ""},
       clientId : {type : String},
       professionalId : {type : String,},
       milestoneTitle : {type : String, },
       milestoneAmount : {type : Number},
       milestoneStatusClient : {type : String, default : "unpaid"},
       milestoneStatusProfessional : {type : String, default : "unrecieved"},
       milestoneTimeStamp : {type: Date},
       transactionTimeStamp : {type : Date, default : null},
    }],
    serviceNeeded : { 
        type : String,
        lowercase: true,
        default : ""
    },
    serviceLocationPostal:{ 
        type : String,
        default : ""
    },
    serviceLocationTown :{
        type : String,
        lowercase: true,
        default : ""
    },
    serviceLocationCountry:{
        type : String,
        lowercase: true,
        default : ""
    },
    serviceTitle : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceDes : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceCategory : {
        type : String,
        lowercase: true,
        default : ""
    },
    serviceCategoryService : {
        type : Array,
        lowercase: true,
        default : ""
    },
    projectTimeStamp: {
        type: Date, 
        default : Date.now()
    },
    awardedStatusClient : {  //awarded/unawarded/completed/cancelled
        type : String,     
        default : "awarded"
    },
    ProjectStatusProfessional : {   //pending/awarded/completed/cancel
        type : String, 
        default : "pending"
    },
    paymentCompleteStatus : {  //complete/incomplete
        type : String,
        default : "incomplete"
    },
    projectStatus : {//active/completed/cancelled
        type : String,  
        lowercase: true,   
        default : "active"
    },
    paymentInvoiceNumber : {
        type : String,
        default : ""
    },
    awardedTimeStamp : {
        type: Date,
        default : Date.now()
    },
})


let AwardedData =  new mongoose.model("AwardedProjects", AwardedProjectsSchema);

module.exports = AwardedData;