const ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function memberShipController(req, res){
    try{
        let data = await ProfessionalsData.find({membershipStatus : { $ne: "closed" }}).select({
            membershipStatus : 1,
            memberShipExpirationDate : 1,
            professionalFullName : 1,
            professionalPictureLink : 1,
        });

        res.status(200).json({ status: "success", userStatus: "SUCCESS",data : data});
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = memberShipController;