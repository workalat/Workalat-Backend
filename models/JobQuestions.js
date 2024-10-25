require("dotenv").config();
let mongoose = require("mongoose");


let JobQuestionsSchema  = new mongoose.Schema({
    questionTitle : {
        type : String
    },
    questionType : {
        type : String   
    },
    questionChoices :{
        type  : Array
    },
    slug : {
        type : Number
    }
    
})


let JobQuestion =  new mongoose.model("JobQuestion", JobQuestionsSchema);

module.exports = JobQuestion;