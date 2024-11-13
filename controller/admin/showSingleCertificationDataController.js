const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");




async function showSingleCertificationDataController(req, res){
    try{

        let certificationId = req.body.certificationId;

        let data = await ProfessionalsData.findOne(
            { "certifications._id": certificationId },
            { "certifications.$": 1 } 
        );
        
        res.status(200).json({status : "success", userStatus : "SUCCESS", data : data});
        
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showSingleCertificationDataController;