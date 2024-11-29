const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");
const ProjectsData = require("../../models/Project");
const AdminFeaturesData = require("../../models/AdminFeatures");

async function deleteCategoryController(req, res){
    try{
        let oldValue = req.body.oldValue.toLowerCase();
    // Fetch the document
    let data = await AdminFeaturesData.findOne({});

    if (!data || data === null) {
      return res.status(404).json({ status: "fail", userStatus: "FAILED", message: "Data not found." });
    }

    // Remove the matching category
    data.category = data.category.filter((val) => val !== oldValue);

    // Remove services with the matching category
    data.services = data.services.filter((service) => service.category !== oldValue);

    // Remove categoryQuestions with the matching type
    data.categoryQuesions = data.categoryQuesions.filter((question) => question.type !== oldValue);

    data.markModified('categoryQuesions')
    // Save the changes
    await data.save();

    res.status(200).json({ status: "success", userStatus: "SUCCESS", message: `${oldValue.toUpperCase()} deleted successfully.` });

        
    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = deleteCategoryController;