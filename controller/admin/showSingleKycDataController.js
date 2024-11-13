const ClientsData = require("../../models/Client");




async function showallKycDataController(req, res){
    try{

        let userId = req.body.userId;
        let userType = req.body.userType; //client/professional

        if(userType === "client"){
            
       let clientData = await ClientsData.findOne({
       _id : userId
       }).select({kyc : 1});
        res.status(200).json({ status: "success", userStatus: "SUCCESS", data: clientData });
        }
        else{

        }

     
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showallKycDataController;