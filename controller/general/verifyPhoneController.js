let verification = require("../../middleware/verification");
let ClientsData= require ("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function VerfiyPhoneController(req, res){
    try{
        // let {token, userType} = req.body;

        let token = req.body.token;
        let userType = req.body.userType;
        
        let verify = await verification({token: token});
        console.log(verify);
        if(verify.verified === true || verify.verified){
            if(userType === "client"){
                let d = await ClientsData.findOne({_id : verify._id}).select({isClientPhoneNoVerify : 1, clientPhoneNo : 1});
                if(d === null){
                    throw new Error("No data found, please login again.")
                }
                 else{
                    let data = [{
                        isPhoneNoVerify : d.isClientPhoneNoVerify,
                        phoneNo : d.clientPhoneNo
                    }];
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: "User Data Found", verified: true, userId : verify._id ,data : data});
                }
            }
            else{
                let d = await ProfessionalsData.findOne({_id : verify._id}).select({isprofessionalPhoneNoVerify : 1, professionalPhoneNo : 1});
                console.log(d);
                if(d === null){
                    throw new Error("No data found, please login again.")
                }
                else{
                    let data = [{
                        isPhoneNoVerify : d.isprofessionalPhoneNoVerify,
                        phoneNo : d.professionalPhoneNo
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


module.exports = VerfiyPhoneController;