let AdminFeaturesData = require("../../models/AdminFeatures");
const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");
async function kycApprovalContoller(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType;
        let adminComment = req.body.adminComment;
        let choice = req.body.choice; //"approved/rejected";

        console.log(req.body);
        if(userType === "client"){
            let client = await ClientsData.findOne({_id : userId}).select({kycStatus : 1, kyc  : 1});
            if(client === null){
                throw new Error("Invalid Credentials, No user Data Found");
            } 
            
            client.kyc[0].adminComment = adminComment;
            client.kycStatus = `${(choice === "approved") ? "approved" : "rejected"}`;
            
            await client.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "KYC Request Status Changed Successfully", currentStatus : client.kycStatus})
        }
        else{
            
            let professional = await ProfessionalsData.findOne({_id : userId}).select({kycStatus : 1, kyc  : 1});
            if(professional === null){
                throw new Error("Invalid Credentials, No user Data Found");
            } 
            
            professional.kyc[0].adminComment = adminComment;
            professional.kycStatus = `${(choice === "approved") ? "approved" : "rejected"}`;
            
            await professional.save();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "KYC Request Status Changed Successfully", currentStatus : professional.kycStatus})
        }
        

    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = kycApprovalContoller;