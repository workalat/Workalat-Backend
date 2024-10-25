let ProfessionalsData = require("../../models/Professional");
async function addDetailsProfessionalsController(req, res){
    try{
        let userId = req.body.userId;
        let name = req.body.name;
        let companyName = req.body.companyName;
        let companyWebsite = req.body.companyWebsite;
        let companySize = req.body.companySize; 
        let bio = req.body.bio;
        let skills = req.body.skills; //Array
        let postCode = req.body.postCode;
        console.log(req.body);
        // let city = req.body.city;
        // let country = req.body.country;
        // console.log(req.body);

        let data = await ProfessionalsData.findOne({_id : userId});
        console.log(data);
        if(data === null){
            throw new Error("Invalid Credentials, please login again");
        } 
        else{
            data.professionalFullName = name;
            data.professionalCompanyName = companyName;
            data.professionalCompanywebsite = companyWebsite;
            data.professionalCompanySize = companySize;
            data.professionalBio = bio; 
            data.professionalSkills = skills; //Array
            data.professionalServiceLocPostCodes = postCode; //Array
            // data.professionalServiceLocCity = city;
            // data.professionalServiceLocCountry = country;
            await data.save();
            // console.log(data);
            res.status(200).json({status : "success", userStatus : "SUCCESS", userType : "professional", userId : data._id ,message : "Data Saved Successfully"});
        }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addDetailsProfessionalsController;