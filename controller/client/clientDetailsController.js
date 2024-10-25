const ClientsData = require("../../models/Client");

async function clientDetailsController(req, res){
    let clientId = req.body.clientId;
    console.log(clientId);
    console.log(req.body);
    try{       
        let data = await ClientsData.findOne({$and : [{_id : clientId}, {adminAccessClient : true}]}).select({
            clientFullName : 1 ,
            isClientPicture : 1,
            clientPictureLink : 1,
            clientCountry  : 1,
            accountCreationDate : 1, 
            clientBio : 1,
            reviews : 1,
            totalRatings : 1, 
            kycStatus : 1,
            totalReviews : 1,
            isPaymentVerify : 1,
            totalProjectsCompleted : 1,
            isClientEmailVerify : 1,
            isClientPhoneNoVerify : 1,
        });
        if(data !== null){
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data Found Successfully" ,data : data});
        }
        else{
            res.status(400).json({status : "fail", userStatus : "FAIL", message : "No Data Found" ,data : null});
        }
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = clientDetailsController;