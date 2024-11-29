const AdminFeaturesData = require("../../models/AdminFeatures");

async function deletePointsWalletDataController(req, res){
    try{
        let walletId = req.body.walletId;
        console.log(req.body);
 
        const result = await AdminFeaturesData.updateOne(
            { }, // Match the parent document by its `_id`
            {
              $pull: {
                pointRules: { _id: walletId }, // Remove the object in the `points` array with the specified `_id`
              },
            }
          );
      
          if (result.modifiedCount > 0) {
            console.log("Point  deleted successfully");
             res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Point Rule Deleted Successfully"});

          } else {
            throw new Error("No matching Point Rule found to delete");
          }
        
      
        
    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = deletePointsWalletDataController;