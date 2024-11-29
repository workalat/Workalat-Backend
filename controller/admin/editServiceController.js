const AdminFeaturesData = require("../../models/AdminFeatures");

async function editServiceController(req, res){
    try{
        let category = req.body.category;
        let oldValue = req.body.oldValue;
        let newValue = req.body.newValue;
        let old = oldValue.toLowerCase();
        let newVal = newValue.toLowerCase();

        let data = await AdminFeaturesData.findOne()
          data.serviceQuestions = data.serviceQuestions.map((question) => {
            console.log(question.type , old)
            if (question.type == old) {
              question.type = newVal;
            }
            return question;
          });
    
          data.markModified('serviceQuestions')
      
          // Save the changes
          await data.save();


        const d = await AdminFeaturesData.updateOne(
            { "services.category": category, "services.service": oldValue },
            { $set: { "services.$.service.$[elem]": newValue } },
            {
              arrayFilters: [{ "elem": oldValue }]
            }
          );
          
          if (d.modifiedCount > 0) {
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : `${oldValue.toUpperCase()} updated successfully`});
          } else {
            throw new Error("No matching service found");
          }
        
    }
    catch(e){
        console.log("Error while Deleting Reviews Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = editServiceController;