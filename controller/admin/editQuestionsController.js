let JobQuestion = require("../../models/JobQuestions");
async function editQuestionsController(req, res){
    try{
        let questionId = req.body.questionId;
        let questionTitle = req.body.questionTitle;
        let questionType = req.body.questionType;
        let questionSlug = req.body.questionSlug;
        let questionChoices = req.body.questionChoices; //Array

        let questions =  questionChoices.map(str => str.toLowerCase());

        const result = await JobQuestion.updateOne(
            {_id : questionId}, // Match the single document
            {
              $set: {
                questionTitle: questionTitle, // Update `point` value
                questionType : questionType, // Update `amount` value
                slug: questionSlug, // Update `point` value
                questionChoices : questions, // Update `amount` value
              },
            }
          );
      
          if (result.modifiedCount > 0) {
            console.log("Questions updated successfully");
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Questions updated successfully"});
          } else {
            throw new Error("No Questions Data found");
          }

    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = editQuestionsController;