let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function changesRequestController(req, res){
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
                if(current_value === true){
                    data.myRequest = false;
                    await data.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: `Changes in my Request status changed successfully.`, current_value : false});
                }
                else{
                    data.myRequest = true;
                    await data.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: `Changes in my Request status changed successfully.`, current_value : true});
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
                    data.myRequest = false;
                    await data.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: `Changes in my Request status changed successfully.`, current_value : false});
                }
                else{
                    data.myRequest = true;
                    await data.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", msg: `Changes in my Request status changed successfully.`, current_value : true});
                }
            }
        }
    }
    catch(e){
        console.log("Error while marking Changes request.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = changesRequestController;