const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");
const ProjectsData = require("../../models/Project");
const AdminFeaturesData = require("../../models/AdminFeatures");

async function deletePointsBudegetController(req, res){
    try{
        let pointId = req.body.pointId;
 
        let data = await AdminFeaturesData.findOne().select({pointRules : 1});
        console.log(data.pointRules.length);
        data.pointRules = data.pointRules.filter((val)=>{
            if(val._id.toString() !== pointId){
                console.log(val._id ,pointId);
                return val;
            }
        });
        await data.save();
        
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Point Rule Deleted successfully."});

        
    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = deletePointsBudegetController;