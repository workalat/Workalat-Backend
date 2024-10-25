let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function getUserPhoneNoController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType; //client/professional


        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId}).select({clientPhoneNo : 1, clientCountryCode : 1});
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
                res.status(200).json({status : "success", message : "Phone No Found", phoneNo : data.clientPhoneNo, countryCode : data.clientCountryCode});
            }
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId}).select({professionalPhoneNo : 1, professionalCountryCode : 1});
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
                res.status(200).json({status : "success", message : "Phone No Found", phoneNo : data.professionalPhoneNo, countryCode : data.professionalCountryCode});
            }
        }
    }
    catch(e){
        console.log("Error while working with Chat Notifications", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = getUserPhoneNoController;