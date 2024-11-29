const AdminFeaturesData = require("../../models/AdminFeatures");

async function editWalletDataController(req, res){
    try{
        let walletId = req.body.walletId;
        let newPoint = req.body.newPoint;
        let newAmount = req.body.newAmount;

        const result = await AdminFeaturesData.updateOne(
            {}, // Match the single document
            {
              $set: {
                "points.$[elem].point": newPoint, // Update `point` value
                "points.$[elem].amount": newAmount, // Update `amount` value
              },
            },
            {
              arrayFilters: [{ "elem._id": walletId }], // Match the specific object in the `points` array by its `_id`
            }
          );
      
          if (result.modifiedCount > 0) {
            console.log("Point and amount updated successfully");
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Wallet updated successfully"});
          } else {
            throw new Error("No Wallet Data found");
          }
        
    }
    catch(e){
        console.log("Error while Deleting Reviews Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = editWalletDataController;