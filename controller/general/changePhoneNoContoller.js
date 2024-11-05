let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function changePhoneNoContoller(req, res){
    try{
        // let {userId,userEmail, type} = req.body;
        let userType = req.body.userType;
        let userId = req.body.userId;
        let newPhone = req.body.newPhone;
        let newCountryCode = req.body.newCountryCode;

        console.log(req.body);

        if(userType  === "client"){
            let verify = await ClientsData.find({clientPhoneNo : newPhone});
            if(verify.length>0){
                res.status(400).json({status : "fail", userStatus : "FAILED" ,message : `The number ${newPhone} is already registered with another account, please add another number`});
            }
            else{
                let data = await ClientsData.findOne({_id : userId});
                if(data === null){
                    res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "Invalid Credentials, please login again"}); 
                }
                else{   
                    data.clientPhoneNo = newPhone;
                    data.clientCountryCode = newCountryCode;
                    await data.save();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : `Phone Number changed Successfully`});
                }
            }
        }
        else{
            let verify = await ProfessionalsData.find({professionalPhoneNo : newPhone});
            if(verify.length>0){
                res.status(400).json({status : "fail", userStatus : "FAILED" ,message : `The number ${newPhone} is already registered with another account, please add another number`});
            }
            else{
                let data = await ProfessionalsData.findOne({_id : userId});
                if(data === null){
                    res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "Invalid Credentials, please login again"}); 
                }
                else{    
                    data.professionalPhoneNo = newPhone;
                    data.professionalCountryCode = newCountryCode;
                    await data.save();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : `Phone Number changed Successfully`});
                }
            }

        }
        
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = changePhoneNoContoller;