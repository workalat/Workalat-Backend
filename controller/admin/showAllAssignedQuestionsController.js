const AdminFeaturesData = require("../../models/AdminFeatures");
async function showAllAssignedQuestionsController(req, res){
    try{
        let data = await AdminFeaturesData.find({}).select({serviceQuestions : 1,categoryQuesions : 1});
       
        res.status(200).json({status : "success", userStatu : "SUCCESS", data : data});
    }
    catch(e){
        console.log("Error while adding Admins", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showAllAssignedQuestionsController;