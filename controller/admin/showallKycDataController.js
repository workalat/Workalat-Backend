const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");




async function showallKycDataController(req, res){
    try{

        let userType = req.body.userType;
        if(userType === "client"){
            let clientData = await ClientsData.find({
             kycStatus : { $ne: "notApplied" }
            }).select({
             kycStatus : 1,
             'kyc.timeStamp' : 1,
             'kyc.firstName' : 1,
             'kyc.lastName' : 1,
             'kyc._id' : 1,
            });
             res.status(200).json({ status: "success", userStatus: "SUCCESS", data: clientData });
        }
        else{
            let professionalData = await ProfessionalsData.find({
                kycStatus : { $ne: "notApplied" }
               }).select({
                kycStatus : 1,
                'kyc.timeStamp' : 1,
                'kyc.firstName' : 1,
                'kyc.lastName' : 1,
                'kyc._id' : 1,
               });
                res.status(200).json({ status: "success", userStatus: "SUCCESS", data: professionalData });
        }
     
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showallKycDataController;