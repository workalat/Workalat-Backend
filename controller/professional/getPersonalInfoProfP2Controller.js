let ProfessionalsData = require("../../models/Professional");

async function getPersonalInfoProfP2Controller(req, res){
        try{
            let {userId} = req.body;
            let data = await ProfessionalsData.findOne(({_id : userId})).select({
                professionalCompanyName : 1,
                professionalServiceLocPostCodes : 1,
                professionalPrimaryService : 1,
                professionalSkills : 1,
                professionalBio  : 1,
                professionalCompanywebsite : 1,
                professionalAddress : 1,
                professionalCompanyTitle : 1
            });
            if(data === null){
                throw new Error("Invalid Credentials, please login again");
            }
            else{
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data Fetched Successfully", data: data});
            }
        }
        catch(e){
            console.log("Error while adding professional's details", e);
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
        }
};

module.exports = getPersonalInfoProfP2Controller;