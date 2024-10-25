let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function getNotificationController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType; //client/professional


        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId});
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
               res.status(200).json({status : "success", userStatus : "SUCCESS",data : {request : data.myRequest, chatNotification : data.chatNotifications, reminder : data.reminderChats}})
            }
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId});
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
                res.status(200).json({status : "success", userStatus : "SUCCESS",data : {request : data.myRequest, chatNotification : data.chatNotifications, reminder : data.reminderChats}})
            }
        }
    }
    catch(e){
        console.log("Error while Fetching chatScreen Details.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = getNotificationController;