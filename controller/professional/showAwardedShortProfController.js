let AwardedData = require("../../models/Awarded");

async function showAwardedShortProfController(req, res){
    try{
        let {userId} = req.body;
        console.log(req.body)
        let data = await AwardedData.find({professionalId : userId, $and : [{ProjectStatusProfessional : "awarded"}]}).select({
            ProjectId : 1,
            serviceNeeded : 1,
            serviceLocationPostal : 1,
            serviceLocationTown : 1,
            serviceLocationCountry : 1,
            serviceTitle : 1,
            serviceDes : 1,
            projectTimeStamp  : 1,
        });
        console.log(data);
        if(data === null){
            throw new Error("No Data Found , please login again");
        }
        else{
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: data });
        }
    }
    catch(e){
        console.log("Error while adding fetching propsals data", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showAwardedShortProfController;