const AdminFeaturesData = require("../../models/AdminFeatures");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function getPointsCategoryController(req, res){
    try{
        let category = req.body.category;

        let data = await AdminFeaturesData.findOne();
        let d = data.pointRules.filter((val)=>{
            return(val.category === category);
        });
        console.log(d);
        res.status(200).json({status: "success", userStatus : "SUCCESS" , data: d});


    }
    catch(e){
        console.log("Error while working with Chat Notifications", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = getPointsCategoryController;