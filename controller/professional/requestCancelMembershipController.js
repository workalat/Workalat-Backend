const ProfessionalsData = require("../../models/Professional");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function requestCancelMembershipController(req, res){
    let professionalId  = req.body.professionalId;
    let trxId = req.body.trxId;

    try{
        
        let professionalData = await ProfessionalsData.findOne({_id : professionalId});
        
        if(professionalData === null ){
            throw new Error("No Data Found, please login again.")
        }

        let findTransaction = professionalData.membershipTransactionHistory.find((val)=>{
            if(val._id == trxId){return(val)}
        })
        console.log(findTransaction);

        if(findTransaction === undefined){
            throw new Error("Invalid Transaction ID, please add a valid transaction ID");
        };

        findTransaction.isRequestCancellation = true;

        // professionalData.membershipLeads -= 5;
        professionalData.profileStatus = "normal";
        professionalData.isMembership = false;
        professionalData.membershipStatus = "request cancelled";

        await professionalData.save();
        res.status(200).json({status: "success", userStatus: "SUCCESS", message: "Your Cancellation Request has been submitted, It may take atleast 36-48 hours to refund your amount and cancel your membership."})
    }
    catch(e){
        console.log("Error while adding fetching propsals data", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = requestCancelMembershipController;