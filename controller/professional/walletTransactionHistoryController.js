let ProfessionalsData = require("../../models/Professional");
async function walletTransactionHistoryController(req, res){
    
    try{
        let userId = req.body.userId;
        console.log("user id", userId);
        
        let professionalData = await ProfessionalsData.findOne({_id : userId}).select({pointsHistory : 1, professionalTotalBidPoints : 1, payAsGo : 1});

        if(professionalData === null){
            throw new Error("No Data Found.")
        }
        res.status(200).json({status : "success", userStatus : "SUCCESS", data : professionalData});
    }
    catch(e){
        console.log("Error while checking out for wallet topup of professionals.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message, });
    }
};

module.exports = walletTransactionHistoryController;