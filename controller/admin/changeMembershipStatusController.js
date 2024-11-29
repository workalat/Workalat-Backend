const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");
const ProjectsData = require("../../models/Project");

async function changeMembershipStatusController(req, res){
    try{
        let professoinalId = req.body.professoinalId;
        let choice =  req.body.choice;  //active , cancelled
        console.log(req.body);
        let professional = await ProfessionalsData.findOne({_id : professoinalId}).select({
            isMembership : 1,
            membershipStatus : 1,
            profileStatus : 1,
            membershipLeads : 1,
            memberShipExpirationDate : 1
        });
        if(professional === null){
            throw new Error("No professional found.")
        }
        
        professional.membershipStatus = choice ===  "active" ? "active" : "cancelled" ;
        professional.isMembership =  choice ===  "active" ? true : false;
        professional.profileStatus = choice ===  "active" ? "premium" : "normal";
        professional.membershipLeads =choice === "active" ? professional.membershipLeads + 5 :  professional.membershipLeads - 5;
        
        const now = new Date();
        professional.memberShipExpirationDate = new Date(now.setDate(now.getDate() + 30)).toISOString();
        await professional.save();
        
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : `Membership status ${choice === "active" ? "Activated" : "Cancelled" } successfully.` });

    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = changeMembershipStatusController;