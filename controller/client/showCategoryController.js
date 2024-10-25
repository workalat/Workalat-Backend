let AdminFeaturesData = require("../../models/AdminFeatures");

async function showCategoryController(req, res){
    try{
        let data = await AdminFeaturesData.find().select({category : 1});
        console.log(data);
        res.status(200).json({status: "success", userStatus : "SUCCESS" , data: data})
    }
    catch(e){
        console.log("Error while fetching category data", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }

};

module.exports = showCategoryController;