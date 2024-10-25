let AdminFeaturesData = require("../../models/AdminFeatures");
async function addPointsBudgetController(req, res){
    try{
        let points = req.body.points; //Category/Service
        let category = req.body.category; //Name of category/service
        let frequency = req.body.frequency; //Array of slugs/Questions
        let budget = req.body.budget;
        console.log(req.body);

        let adminFeatureData = await  AdminFeaturesData.findOne();
        let rule = {
            point : points,
            category : category,
            frequency : frequency,
            budget : budget
        }
        adminFeatureData.pointRules.push(rule);
        await adminFeatureData.save();
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Points Rule added successfully"});
       
        
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addPointsBudgetController;


