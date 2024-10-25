const AdminFeaturesData = require("../../models/AdminFeatures");

async function getPointsBudgetWalletController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType; //client/professional

        let data = await AdminFeaturesData.findOne().select({points : 1});
        res.status(200).json({status : 'success', data:data});
    }
    catch(e){
        console.log("Error while Fetching chatScreen Details.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = getPointsBudgetWalletController;