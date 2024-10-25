let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function changeEmailController(req, res){
    try{
        let userId = req.body.userId;
        let email = req.body.email;
        let newEmail = req.body.newEmail;
        let userType = req.body.userType;


        if(userType === "client"){         
            let data = await ClientsData.findOne({_id : userId});
            if(data === null){
                throw Error(`No account found, please login again.`);
            }
            else{
                let verifyEmail = await ClientsData.find({clientEmail : newEmail});
                if(verifyEmail.length>0){
                    throw Error(`The provided email: ${newEmail} is already registered with another account, please use a different email`);
                }
                else{
                    if(data.clientRegisterationType === "email" || data.clientRegisterationType === "phone"){
                        data.clientEmail = newEmail;
                        await data.save();
                        res.status(200).json({status : "success", userStatus : "SUCCESS", message : `Email is successfully changed from ${email} to ${newEmail}`});
                    }
                    else{
                        throw Error(`This account is registered with ${data.clientRegisterationType}, and hence the email cannot be changed.`);  
                    }
                }
            }                
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId});
            if(data === null){
                throw Error(`No account found, please login again.`);
            }
            else{
                let verifyEmail = await ProfessionalsData.find({professionalEmail : newEmail});
                // console.log(verifyEmail.length, verifyEmail);
                if(verifyEmail.length>0){
                    throw Error(`The provided email: ${newEmail} is already registered with another account, please use a different email`);
                }
                else{
                    if(data.professionalRegisterationType === "email" || data.professionalRegisterationType === "phone"){
                        data.professionalEmail = newEmail;
                        await data.save();
                        res.status(200).json({status : "success", userStatus : "SUCCESS", message : `Email is successfully changed from ${email} to ${newEmail}`});
                    }
                    else{
                        throw Error(`Account associated with ${data.professionalRegisterationType} cannot change their email.`);  
                    }
                }
            } 
        }


    }
    catch(e){
        console.log("Error while changing email. ", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = changeEmailController;