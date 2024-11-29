const AdminFeaturesData = require("../../models/AdminFeatures");

async function deleteWalletDataController(req, res){
    try{
        let walletId = req.body.walletId;
 
        const result = await AdminFeaturesData.updateOne(
            { }, // Match the parent document by its `_id`
            {
              $pull: {
                points: { _id: walletId }, // Remove the object in the `points` array with the specified `_id`
              },
            }
          );
      
          if (result.modifiedCount > 0) {
             res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Wallet Data Deleted Successfully"});

          } else {
            throw new Error("No Wallet found to delete");
          }
        
      
        
    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = deleteWalletDataController;