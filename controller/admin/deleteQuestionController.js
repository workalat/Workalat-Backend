let JobQuestion = require("../../models/JobQuestions");

async function deleteQuestionController(req, res){
    try{
        let questionId = req.body.questionId;
 
        const result = await JobQuestion.deleteOne(
            {_id : questionId }, // Match the parent document by its `_id`
          );
      
          if (result.deletedCount > 0) {
            console.log("Point deleted successfully");
             res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Question Deleted Successfully"});

          } else {
            throw new Error("No Question found to delete");
          }
        
      
        
    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = deleteQuestionController;