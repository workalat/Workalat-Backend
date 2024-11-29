const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");

async function addPointsProfessionalController(req, res){
    try{
        let userId = req.body.userId;
        let points = req.body.points;

            let data = await ProfessionalsData.findOne({_id : userId}).select({
                professionalTotalBidPoints : 1,
                professionalFullName : 1
            });
            
            if(data === null){
                throw new Error("No Data found!");
            }
            data.professionalTotalBidPoints += parseFloat(points);
            await data.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message :`${points} points added to ${data.professionalFullName.toUpperCase()}'s Account Successfully.`});        
    }
    catch(e){
        console.log("Error while adding points to professional account.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addPointsProfessionalController;