let verification = require("../../middleware/verification");
let ClientsData= require ("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function VerfiyEmailController(req, res){
    try{
        let token = req.body.token;
        let userType = req.body.userType;

        let verify = await verification({token: token});
        console.log(verify);
        if(verify.verified === true || verify.verified){
            if(userType === "client"){
                let d = await ClientsData.findOne({_id : verify._id}).select({isClientEmailVerify : 1, clientEmail : 1});
                if(d === null){
                     throw new Error("No data found, please login again.")
                }
                else{
                    let data = [{
                        isEmailVerify : d.isClientEmailVerify,
                        email : d.clientEmail
                    }];
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: "User Data Found", verified: true, userId : verify._id ,data : data});
                }
            }
            else{
                let d = await ProfessionalsData.findOne({_id : verify._id}).select({isprofessionalEmailVerify : 1, professionalEmail : 1});
                console.log(d);
                if(d === null){
                    throw new Error("No data found, please login again.")
                }
                else{
                    let data = [{
                        isEmailVerify : d.isprofessionalEmailVerify,
                        email : d.professionalEmail
                    }];
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: "User Data Found", verified: true, userId : verify._id ,data : data});
                }

            }
        }
        else{
            throw new Error("Invalid Credentials, please login again.")
        }

    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = VerfiyEmailController;