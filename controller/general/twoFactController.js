let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function twoFactController(req, res){
    let userId = req.body.userId;
    let userType = req.body.userType; //client/professional
    let current_value = req.body.current_value;  //enable / disable
    console.log(req.body);
    try{
        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId});
            console.log(data); 
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
                if(current_value === true){
                    data.isTwoFactAuth = false;
                    data.ChangingDates[0].twoFactAuthLast = Date.now();
                    await data.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: `Two Factor Authentication Disabled successfully.`, current_value : false});
                }
                else{
                    data.isTwoFactAuth = true;
                    data.ChangingDates[0].twoFactAuthLast = Date.now();
                    await data.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: `Two Factor Authentication Enabled successfully.`, current_value : true});
                }

            }
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId});
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
                if(current_value === true){
                    data.isTwoFactAuth = false;
                    data.ChangingDates[0].twoFactAuthLast = Date.now();
                    await data.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: `Two Factor Authentication disabled successfully.`, current_value : false});
                }
                else{
                    data.isTwoFactAuth = true;
                    data.ChangingDates[0].twoFactAuthLast = Date.now();
                    await data.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: `Two Factor Authentication enabled successfully.`, current_value : true});
                }
            }
        }

    }
    catch(e){
        console.log("Error while changing email. ", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = twoFactController;