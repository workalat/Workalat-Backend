let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let bcrypt = require("bcryptjs");

async function changePasswordLoginController(req, res){
    // let userType = req.body.userType;
    let userId = req.body.userId;
    let newPassword = req.body.newPassword;

    try{
        let clientCheck = await ClientsData.findOne({_id : userId});
        if(clientCheck !== null){
            let professionalCheck = await ProfessionalsData.findOne({clientId : userId});
            if(professionalCheck !== null){
                clientCheck.clientPassword =newPassword;
                professionalCheck.professionalPassword = newPassword;

                await clientCheck.save();
                await professionalCheck.save();
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : "your account password has been changed successfully"});
            }
            else{  
                clientCheck.clientPassword =newPassword;

                await clientCheck.save();
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : "your account password has been changed successfully"});
            }
        }
        else{
            let professionalCheck = await ProfessionalsData.findOne({_id : userId});
            if(professionalCheck !== null){
                let clientCheck = await ClientsData.findOne({professionalId : userId});
                if(clientCheck !== null){
                    clientCheck.clientPassword =newPassword;
                    professionalCheck.professionalPassword = newPassword;
    
                    await clientCheck.save();
                    await professionalCheck.save();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "your account password has been changed successfully"});
                }
                else{
                    professionalCheck.professionalPassword = newPassword;
    
                    await professionalCheck.save();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "your account password has been changed successfully"});
                }
            }
            else{
                res.status(400).json({status : "fail", userStatus  : "FAIL", message : "No Account Found, please enter correct details"});
            }


        }

    }
    catch(e){
        console.log("Error while changing password of user. ", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = changePasswordLoginController;