const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
const moment = require("moment");

async function adminStatusUsersController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType;
        let choice = req.body.choice; //access / ban
        console.log(req.body);

        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId}).select({
                adminAccessClient : 1,
            });
            if(data === null){
                throw new Error("No Data found!");
            }
            if(choice === "access"){
                data.adminAccessClient = true;
                await data.save();
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Account status changed to Accessed."});
            }
            else{
                data.adminAccessClient = false;
                await data.save();
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Account status changed to Banned."});
            }
           
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId}).select({
                adminAccessProfessional : 1,
            });
            
            if(data === null){
                throw new Error("No Data found!");
            }
            if(choice === "access"){
                data.adminAccessProfessional = true;
                await data.save();
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Account status changed to Accessed."});
            }
            else{
                data.adminAccessClient = false;
                await data.save();
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Account status changed to Banned."});
            }
        }
    }
    catch(e){
        console.log("Error while Changing status of user account.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = adminStatusUsersController;