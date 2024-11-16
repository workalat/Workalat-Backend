let AdminFeaturesData = require("../../models/AdminFeatures");
const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
const TicketsData = require("../../models/Tickets");
const moment = require("moment");



async function findClients(){
    try{
        const clientData = await ClientsData.aggregate([
            {
                $project: {
                    month: { $month: "$accountCreationDate" },  // Extract month from accountCreationDate
                    year: { $year: "$accountCreationDate" }    // Extract year from accountCreationDate
                }
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" },  // Group by year and month
                    count: { $sum: 1 }  // Count the number of clients for each month
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }  // Sort by year and month to keep chronological order
            }
        ]);
        
        // Format the result into an array where each index corresponds to a month in the year
        let clientMonthlyData = Array(12).fill(0);  // Initialize an array with 12 months, each having 0
        
        clientData.forEach(item => {
            const monthIndex = item._id.month - 1; // Adjust for zero-based index (January = 0)
            clientMonthlyData[monthIndex] = item.count; // Set the client count for that month
        });
        return(clientMonthlyData);
    }
    catch(e){
        console.log(e);
    }
}

async function findProfessionals(){
    try{
        const clientData = await ProfessionalsData.aggregate([
            {
                $project: {
                    month: { $month: "$accountCreationDate" },  // Extract month from accountCreationDate
                    year: { $year: "$accountCreationDate" }    // Extract year from accountCreationDate
                }
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" },  // Group by year and month
                    count: { $sum: 1 }  // Count the number of clients for each month
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }  // Sort by year and month to keep chronological order
            }
        ]);
        
        // Format the result into an array where each index corresponds to a month in the year
        let clientMonthlyData = Array(12).fill(0);  // Initialize an array with 12 months, each having 0
        
        clientData.forEach(item => {
            const monthIndex = item._id.month - 1; // Adjust for zero-based index (January = 0)
            clientMonthlyData[monthIndex] = item.count; // Set the client count for that month
        });
        return(clientMonthlyData);
    }
    catch(e){
        console.log(e);
    }
}





async function dashboardDataController(req, res){
    try{
       let last24Hours = moment().subtract(24, 'hours').toISOString();
       let totalClient = await ClientsData.find().countDocuments();
       let totalProfessional = await ProfessionalsData.find().countDocuments();
       let totalPremiumProfessional = await ProfessionalsData.find({membershipStatus : "active"}).countDocuments();
       let totalLeads = await ProjectsData.find({
        projectTimeStamp: { $gte: last24Hours }  // Filters for leads with projectTimeStamp within the last 24 hours
    }).countDocuments();
       let totalOpenLeads = await ProjectsData.find({awardedStatus : "unawarded"}).countDocuments();
       let totalAwardedLeads = await ProjectsData.find({awardedStatus : "awarded"}).countDocuments();
       let totalRejectedLeads = await ProjectsData.find({projectStatusAdmin : false}).countDocuments();
       let totalAdminTickets = await TicketsData.find({ticketStatus : "admin"}).countDocuments();
       let uppercards = [
        {
            id : 1,
            title : "total leads today",
            amount : totalLeads
        },
        
        {
            id: 2,
            title: "open leads",
            amount: totalOpenLeads
        },
        {
            id: 3,
            title: "awarded leads",
            amount: totalAwardedLeads
        },
        {
            id: 4,
            title: "total users",
            amount: totalClient+totalProfessional
        }
       ];
       let totalClientsArray = await findClients();
       let numberTotalClient =  totalClientsArray.reduce((sum, value) => sum + value, 0);
       let totalProfessionalsArray = await findProfessionals();
       let numerTotalProfessionals = totalProfessionalsArray.reduce((sum, value) => sum + value, 0);
    //    console.log( "Total Clients" ,totalClientsArray);
    //    console.log( "Total Clients" ,numberTotalClient);
    //    console.log( "Total PRofessionals" ,totalProfessionalsArray);
    //    console.log( "Total PRofessionals" ,numerTotalProfessionals);
    //    console.log( "Upper Cards" ,uppercards);
    //    console.log( "Total PRemium User" ,totalPremiumProfessional);
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Dashboard Data Fetched Successfully.", data:{
            totalClientsArray,
            numberTotalClient,
            totalProfessionalsArray,
            numerTotalProfessionals,
            uppercards,
            totalPremiumProfessional,
            totalOpenLeads,
            totalAwardedLeads,
            totalRejectedLeads,
            totalAdminTickets
        }});




      


    }
    catch(e){
        console.log("Error while Fetching Dashboard Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = dashboardDataController;