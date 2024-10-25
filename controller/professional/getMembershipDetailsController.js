let ProfessionalsData = require("../../models/Professional");
async function getMembershipDetailsController(req, res){
    try{
        let {userId} = req.body;
        let data = await ProfessionalsData.findOne(({_id : userId})).select({
            membershipStatus : 1,
            memberShipExpirationDate : 1,
            membershipTransactionHistory : 1,
            accountCreationDate : 1
        });
        if(data === null){
            throw new Error("Invalid Credentials, please login again");
        }
        else{
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data Fetched Successfully", data : data});
        }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = getMembershipDetailsController;