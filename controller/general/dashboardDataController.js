let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function dashboardDataController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType; //client/professional
        let current_value = req.body.current_value;  // true / false


        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId});
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
                res.status(200).json({status : "success", userStatus : "SUCCESS", data:{
                    userName : data.clientFullName,
                    userService : "",
                    totalRatings : data.totalRatings,
                    totalReviews : data.totalReviews,
                    userBio : data.clientBio,
                    isEmailVerify : data.isClientEmailVerify,
                    isPhoneVerify : data.isClientPhoneNoVerify,
                    isProfileComplete : data.completeProfileRegistration,
                    isPaymentVerify : data.isPaymentVerify,
                }})

            }
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId});
            // console.log(data.isPaymentVerify);
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
                res.status(200).json({status : "success", userStatus : "SUCCESS", data:{
                    userName : data.professionalFullName,
                    userService : data.professionalPrimaryService,
                    totalRatings : data.totalRatings,
                    totalReviews : data.totalReviews,
                    userBio : data.professionalBio,
                    isEmailVerify : data.isprofessionalEmailVerify,
                    isPhoneVerify : data.isprofessionalPhoneNoVerify,
                    isProfileComplete : data.completeProfileRegistration,
                    isPaymentVerify : data.isPaymentVerify,
                    locations : data.professionalServiceLocPostCodes,
                    skills : data.professionalSkills
                }})
            }
        }
    }
    catch(e){
        console.log("Error while marking fetching Dashboard Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = dashboardDataController;