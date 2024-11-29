const TransactionData = require("../../models/Transaction");

async function creditAndWalletController(req, res){
    try{
        let data = await TransactionData.find().select({
            professionalId : 0,
            points : 0,
            transactionDes : 0,
            transactionStatus : 0
        });
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data found successfully.", data: data });

    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = creditAndWalletController;