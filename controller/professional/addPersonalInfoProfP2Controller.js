let ProfessionalsData = require("../../models/Professional");

async function addPersonalInfoProfP2Controller(req, res){
    try{
        let userId = req.body.userId;
        let companyName = req.body.companyName;
        let companyTitle = req.body.companyTitle; 
        let postalCode = req.body.postalCode; //Array
        // let serviceCity = req.body.serviceCity; 
        // let serviceCounty = req.body.serviceCounty;
        let primaryService = req.body.primaryService;
        let ser = req.body.services;      //Array
        let bio = req.body.bio;    
        let companyWebsite = req.body.companyWebsite;
        let address = req.body.address;
        let completeProfileRegistration = req.body.completeProfileRegistration;

        let services =  ser.map(str => str.toLowerCase());

        let data = await ProfessionalsData.findOne(({_id : userId}));
        console.log(data)
        if(data === null){
            throw new Error("Invalid Credentials, please login again");
        }
        else{
            data.professionalCompanyName = companyName;
            data.professionalCompanyTitle = companyTitle;
            data.professionalServiceLocPostCodes = postalCode;
            data.professionalPrimaryService = primaryService;
            data.professionalSkills =services;
            data.professionalCompanywebsite  = companyWebsite;
            data.professionalBio = bio;
            data.professionalAddress = address;
            data.completeProfileRegistration = completeProfileRegistration;
            await data.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data Saved Successfully"});
        }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addPersonalInfoProfP2Controller;