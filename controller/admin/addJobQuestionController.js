let AdminFeaturesData = require("../../models/AdminFeatures");
async function addJobQuestionController(req, res){
    try{
        let mode = req.body.mode; //Category/Service
        let type = req.body.type; //Name of category/service
        let slugs = req.body.slugs; //Array of slugs/Questions

        let adminFeatureData = await  AdminFeaturesData.findOne();
        
        if(mode === "category"){
            let find = false;
            if(adminFeatureData.categoryQuesions.length>0){
                
            adminFeatureData.categoryQuesions.filter((val)=>{
                if(val.type === type){
                    val.type = type;
                    val.slugs = slugs;
                    find = true;
                }
            });
            if(find === true){
                adminFeatureData.markModified('categoryQuesions')
                await adminFeatureData.save();
                res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Questions Addedd Successfully"});
            }
            else{
                adminFeatureData.categoryQuesions.push({type : type, slugs : slugs});
                adminFeatureData.markModified('categoryQuesions')
                await adminFeatureData.save();
                res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Questions Addedd Successfully"});
            }
            }
            else{
                adminFeatureData.categoryQuesions.push({type : type, slugs : slugs});
                adminFeatureData.markModified('categoryQuesions')
                await adminFeatureData.save();
                res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Questions Addedd Successfully"});
            }
        }
        else{
            let find = false;
            if(adminFeatureData.serviceQuestions.length>0){
                
            adminFeatureData.serviceQuestions.filter((val)=>{
                if(val.type === type){
                    val.type = type;
                    val.slugs = slugs;
                    find = true;
                }
            });
            if(find === true){                
                adminFeatureData.markModified('serviceQuestions')
                await adminFeatureData.save();
                res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Questions Addedd Successfully"});
            }
            else{
                adminFeatureData.serviceQuestions.push({type : type, slugs : slugs});
                adminFeatureData.markModified('serviceQuestions')
                await adminFeatureData.save();
                res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Questions Addedd Successfully"});
            }
            }
            else{
                adminFeatureData.serviceQuestions.push({type : type, slugs : slugs});
                adminFeatureData.markModified('serviceQuestions')
                await adminFeatureData.save();
                res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Questions Addedd Successfully"});
            }

        }
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addJobQuestionController;


