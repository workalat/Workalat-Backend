let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function getChatDetailsController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType; //client/professional


        if(userType === "client"){
            let data = await ClientsData.findOne({_id : userId});
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
               res.status(200).json({status : "success", userStatus : "SUCCESS",data : {mark : data.markAsAvailalbe, chat : data.activeChat}})
            }
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId});
            if(data === null){
                throw new Error ("No user Found, please login again");
            }
            else{
                res.status(200).json({status : "success", userStatus : "SUCCESS",data : {mark : data.markAsAvailalbe, chat : data.activeChat}})
            }
        }
    }
    catch(e){
        console.log("Error while Fetching chatScreen Details.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = getChatDetailsController;