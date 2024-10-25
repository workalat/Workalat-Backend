let ProfessionalsData = require("../../models/Professional");
async function addPersonalnfoProfP1Controller(req, res){
    try{
        let userId = req.body.userId;
        let name = req.body.name;
        let data = await ProfessionalsData.findOne(({_id : userId}));
        if(data === null){
            throw new Error("Invalid Credentials, please login again");
        }
        else{
            data.professionalFullName = name;
            await data.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data Saved Successfully"});
        }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addPersonalnfoProfP1Controller;