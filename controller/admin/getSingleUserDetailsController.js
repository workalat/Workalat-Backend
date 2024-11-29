const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");

async function getSingleUserDetailsController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType;

        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId}).select({
                clientFullName : 1,
                clientCountry : 1,
                clientEmail : 1,
                clientPhoneNo : 1,
                accountCreationDate : 1,
                lastLoginDate : 1,
                registerAs : 1,
            });
            if(data === null){
                throw new Error("No Data found!");
            }
            let d = {
                userFullName : data.clientFullName,
                userCountry : data.clientCountry,
                userEmail : data.clientEmail,
                userPhoneNo : data.clientPhoneNo,
                accountCreationDate : data.accountCreationDate,
                lastLoginDate : data.lastLoginDate,
                userId : data._id,
                userType : "client",
                userRegisterAs : data.registerAs
            }
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Dashboard Data Fetched Successfully.", data: d});
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId}).select({
                professionalFullName : 1,
                professionalCompanyName  : 1,
                professionalCountry : 1,
                professionalEmail : 1,
                professionalPhoneNo : 1,
                accountCreationDate : 1,
                lastLoginDate : 1,
                registerAs : 1,
            });
            
            if(data === null){
                throw new Error("No Data found!");
            };
            let d = {
                userFullName : data.professionalFullName,
                userCountry : data.professionalCountry,
                userEmail : data.professionalEmail,
                userPhoneNo : data.professionalPhoneNo,
                accountCreationDate : data.accountCreationDate,
                lastLoginDate : data.lastLoginDate,
                userType : "professional",
                userCompanyName : data.professionalCompanyName,
                userId : data._id,
                userRegisterAs : data.registerAs
            }
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Dashboard Data Fetched Successfully.", data: d});
        }
    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = getSingleUserDetailsController;