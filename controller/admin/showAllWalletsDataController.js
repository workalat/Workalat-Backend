const AdminData = require("../../models/Admin");
const AdminFeaturesData = require("../../models/AdminFeatures");
async function showAllWalletsDataController(req, res){
    try{
        let data = await AdminFeaturesData.find({}).select({points : 1});
        res.status(200).json({status : "success", userStatu : "SUCCESS", data : data});
    }
    catch(e){
        console.log("Error while adding Admins", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showAllWalletsDataController;