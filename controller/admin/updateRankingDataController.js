let AdminFeaturesData = require("../../models/AdminFeatures");
const ProfessionalsData = require("../../models/Professional");
async function updateRankingDataController(req, res){
    try{
        let rank = req.body.rank;  
        let data = await AdminFeaturesData.findOneAndUpdate({}, {$set: { ranking: rank }}, {new : true}).select({ranking : 1});
        console.log(data);

        let professoinals = await ProfessionalsData.find({}).select({professional_level : 1, totalProjectsCompleted : 1});

        professoinals?.map(async (val)=>{
            if(val.totalProjectsCompleted >= 0 && val.totalProjectsCompleted < rank.level_1){
                console.log("Level 1");
                val.professional_level = 1;
            }
            else if(val.totalProjectsCompleted >= rank.level_1 && val.totalProjectsCompleted < rank.level_2){
                console.log("Level 2");
                val.professional_level = 2;
            }
            else if(val.totalProjectsCompleted >= rank.level_2 && val.totalProjectsCompleted < rank.level_3){
                console.log("Level 3");
                val.professional_level = 3;
            }
            else if(val.totalProjectsCompleted >= rank.level_3 && val.totalProjectsCompleted < rank.level_4){
                console.log("Level 4");
                val.professional_level = 4;
            }
            else if(val.totalProjectsCompleted > rank.level_4 && val.totalProjectsCompleted >= rank.level_pro){
                console.log("Level Pro");
                val.professional_level = 5;
            }
            await val.save();
        });

        res.status(200).json({status: "success", userStatus : "SUCCESS" , message : `Ranking Updated Successfully`});
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = updateRankingDataController;