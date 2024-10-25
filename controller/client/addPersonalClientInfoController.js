let ClientsData = require("../../models/Client");

async function addPersonalClientInfoController(req, res){
    try{
        let userId = req.body.userId; 
        let name = req.body.name;
        let bio = req.body.bio;

        let data = await ClientsData.findOne(({_id : userId}));
        if(data === null){
            throw new Error("Invalid Credentials, please login again");
        }
        else{
            data.clientFullName = name;
            data.clientBio = bio;
            // data.clientCompanywebsite = companyWebsite;
            // data.clientAddress = address;
            await data.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data Saved Successfully"});
        }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addPersonalClientInfoController;