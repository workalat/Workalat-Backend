let ProfessionalsData = require("../../models/Professional");
// let sendOtpVerificationPhone = require("../../middleware/sendOtpVerificationPhone");
async function addProfessionalServicesController(req, res){
    try{
        let userId = req.body.userId;
        let services = req.body.services;

        let professionalData = await ProfessionalsData.findOne({_id :  userId});

        if(professionalData !== null){
            professionalData.professionalSkills.push(...services);
            professionalData.completeProfileRegistration = true;
            await professionalData.save();
            
            res.status(200).json({status : "success", message : "Services Added Successfully", userId : professionalData._id,userType : "professional"})
        }
        else{
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "No userFound, please login Again"});
        }
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addProfessionalServicesController;