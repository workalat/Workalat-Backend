const AdminFeaturesData = require("../../models/AdminFeatures");

async function editPointsWalletDataController(req, res){
    try{
        let walletId = req.body.walletId;
        let newPoint = req.body.newPoint;
        let newCategory = req.body.newCategory;
        let newFrequency = req.body.newFrequency;
        let newBudget = req.body.newBudget;

        const result = await AdminFeaturesData.updateOne(
            {}, // Match the single document
            {
              $set: {
                "pointRules.$[elem].point": newPoint, // Update `point` value
                "pointRules.$[elem].category": newCategory, // Update `amount` value
                "pointRules.$[elem].frequency": newFrequency, // Update `point` value
                "pointRules.$[elem].budget": newBudget, // Update `amount` value
              },
            },
            {
              arrayFilters: [{ "elem._id": walletId }], // Match the specific object in the `points` array by its `_id`
            }
          );
      
          if (result.modifiedCount > 0) {
            console.log("Point and amount updated successfully");
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Points Rule updated successfully"});
          } else {
            throw new Error("No Points Rule Data found");
          }
        
    }
    catch(e){
        console.log("Error while Deleting Reviews Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = editPointsWalletDataController;