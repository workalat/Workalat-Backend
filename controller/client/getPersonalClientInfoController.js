let ClientsData = require("../../models/Client");
async function getPersonalClientInfoController(req, res){
    try{
        let {userId} = req.body;
        let data = await ClientsData.findOne(({_id : userId})).select({clientFullName : 1, clientEmail : 1, clientPhoneNo : 1, clientBio : 1, clientPictureLink : 1});
        if(data === null){
            throw new Error("Invalid Credentials, please login again");
        }
        else{
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data Fetched Successfully", data : data});
        }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = getPersonalClientInfoController;