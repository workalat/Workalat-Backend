const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");
const ProjectsData = require("../../models/Project");
const AdminFeaturesData = require("../../models/AdminFeatures");

async function editCategoryController(req, res){
    try{
        let oldValue = req.body.oldValue;
        let newValue = req.body.newValue;
        let old = oldValue.toLowerCase();
        let newVal = newValue.toLowerCase();

        let data = await AdminFeaturesData.findOne().select();

     
    if (!data) {
        return res.status(404).json({ status: "fail", userStatus: "FAILED", message: "Data not found." });
      }
  
      // Update the `category` array
      data.category = data.category.map((val) => {
        if (val === old) {
          return newVal;
        }
        return val;
      });
  
      // Update the `services` array
      data.services = data.services.map((service) => {
        if (service.category === old) {
          service.category = newVal;
        }
        return service;
      });
  
      // Update the `categoryQuestions` array
      data.categoryQuesions = data.categoryQuesions.map((question) => {
        if (question.type == old) {
          question.type = newVal;
        }
        return question;
      });

      data.markModified('categoryQuesions')
  
      // Save the changes
      await data.save();
      res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Category Updated Successfully."});

        
    }
    catch(e){
        console.log("Error while Deleting Reviews Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = editCategoryController;