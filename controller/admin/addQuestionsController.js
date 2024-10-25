let JobQuestion = require("../../models/JobQuestions");
async function addQuestionsController(req, res){
    try{
        let questionTitle = req.body.questionTitle;
        let questionType = req.body.questionType;
        let questionChoices = req.body.questionChoices; //Array

        let questions =  questionChoices.map(str => str.toLowerCase());

        let questionData = await JobQuestion.find();
        let question = {
            questionTitle : questionTitle.toLowerCase(),
            questionType : questionType.toLowerCase(),
            questionChoices : questions,
            slug : questionData.length+1
        };
        let createQuestion = await JobQuestion.create(question);
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data Added Successfully"});

    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addQuestionsController;