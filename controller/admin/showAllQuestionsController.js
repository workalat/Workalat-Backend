const AdminData = require("../../models/Admin");
const AdminFeaturesData = require("../../models/AdminFeatures");
const JobQuestion = require("../../models/JobQuestions");
async function showAllServiceDataController(req, res){
    try{
        let data = await JobQuestion.find({});
        res.status(200).json({status : "success", userStatu : "SUCCESS", data : data});
    }
    catch(e){
        console.log("Error while adding Admins", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showAllServiceDataController;