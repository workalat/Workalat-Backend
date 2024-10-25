// const AdminFeaturesData = require("../../models/AdminFeatures");
// let AwardedData = require("../../models/Awarded");
// let JobQuestion = require("../../models/JobQuestions");

// async function getJobsQuestionsController(req, res){
//     try{
//         let category = req.body.category;
//         let service = req.body.service;

//         let adminFeatureData = await AdminFeaturesData.findOne();

//         // console.log(adminFeatureData);

//         let find = false;
//         let question;
//         adminFeatureData.serviceQuestions.filter((val)=>{
//             // console.log(val)
//             if(val.type === service){
//                 question = val;
//                 find = true;
//             }
//         });
//         // console.log(question.slug);
//         if(find === true){
//             let q = question.slugs;
//             // let questions = [];

//             let questions  = q.map( async function(val){
//                 try{
//                     console.log(val);
//                     let jobsQuestions = await JobQuestion.findOne({slug : val})
//                     if(jobsQuestions){
//                         console.log(jobsQuestions);
//                         console.log("Yes")
//                         resolve(jobsQuestions);
//                     }
//                 }
//                 catch(e){
//                     console.log("Erro while fetching questions data")
//                 }
//             });
//             let que = questions;
//             console.log( "Questions : ",que);
//             res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Questions Found Successfully", data : questions})
//         }
//         else{

//         }
//     }
//     catch(e){
//         console.log("Error while fetching projects project", e);
//         res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
//     }
// };

// module.exports = getJobsQuestionsController;

const AdminFeaturesData = require("../../models/AdminFeatures");
let JobQuestion = require("../../models/JobQuestions");

async function getJobsQuestionsController(req, res) {
    try {
        let category = req.body.category;
        let service = req.body.service;

        // Fetch admin feature data
        let adminFeatureData = await AdminFeaturesData.findOne();

        let find = false;
        let question;

        // Find the question related to the service
        adminFeatureData.serviceQuestions.filter((val) => {
            if (val.type === service) {
                question = val;
                find = true;
            }
        });

        if (find === true) {
            let q = question.slugs;

            // Use Promise.all to resolve all the async operations inside the map
            let questions = await Promise.all(
                q.map(async (val) => {
                    try {
                        let jobsQuestions = await JobQuestion.findOne({ slug: val });
                        return jobsQuestions;
                    } catch (e) {
                        console.log("Error while fetching questions data", e);
                        return null;
                    }
                })
            );

            // Filter out null values if any queries fail
            questions = questions.filter((q) => q !== null);

            console.log("Questions:", questions);
            res.status(200).json({ 
                status: "success", 
                userStatus: "SUCCESS", 
                message: "Questions Found Successfully", 
                data: questions 
            });
        }
        else {
            let find = false;
            let question;

            // Find the question related to the service
            adminFeatureData.categoryQuesions.filter((val) => {
                if (val.type === category) {
                    question = val;
                    find = true;
                }
            });

            if (find === true) {
                let q = question.slugs;
                // Use Promise.all to resolve all the async operations inside the map
            let questions = await Promise.all(
                q.map(async (val) => {
                    try {
                        let jobsQuestions = await JobQuestion.findOne({ slug: val });
                        return jobsQuestions;
                    } catch (e) {
                        console.log("Error while fetching questions data", e);
                        return null;
                    }
                })
            );

            // Filter out null values if any queries fail
            questions = questions.filter((q) => q !== null);

            console.log("Questions:", questions);
            res.status(200).json({ 
                status: "success", 
                userStatus: "SUCCESS", 
                message: "Questions Found Successfully", 
                data: questions 
            });
            }
            else{
                res.status(200).json({ 
                    status: "success", 
                    userStatus: "SUCCESS", 
                    message: "Questions Found Successfully", 
                    data: [] 
                });
            }
        }
    } catch (e) {
        console.log("Error while fetching questions data", e);
        res.status(400).json({ 
            status: "fail", 
            userStatus: "FAILED", 
            message: e.message 
        });
    }
}

module.exports = getJobsQuestionsController;
