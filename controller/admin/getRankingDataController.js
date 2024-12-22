const AdminFeaturesData = require("../../models/AdminFeatures");

async function getRankingDataController(req, res){
    try{ 

        let data = await AdminFeaturesData.findOne({}).select({ranking : 1})
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Ranking Data successfully", data});
          
        
    }
    catch(e){
        console.log("Error while Fetching Ranking Data .", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = getRankingDataController;