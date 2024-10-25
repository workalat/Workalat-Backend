let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function lastChangesDetailsController(req, res){
    try{
       let userId = req.body.userId; 
       let userType = req.body.userType;
       console.log(req.body);

       if(userType === "client"){
        let data = await ClientsData.findOne({_id : userId}).select({ChangingDates : 1, isTwoFactAuth : 1, kycStatus : 1});
        console.log(data);
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "User Data Found", data  : data});
       }
       else{
        let data = await ProfessionalsData.findOne({_id : userId}).select({ChangingDates : 1, isTwoFactAuth : 1,  kycStatus : 1});
        console.log(data);
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "User Data Found", data  : data});
       }
    }
    catch(e){
        console.log("Error while Adding KYC Details. ", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = lastChangesDetailsController;