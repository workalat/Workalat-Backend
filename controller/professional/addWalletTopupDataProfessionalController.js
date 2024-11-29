let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function addWalletTopupDataProfessionalController(req, res) {
    // let sessionId = "cs_test_a1m1LpbMNsrQriNePWn8r7A42gp6ebOMenEO03MVLVVBF7b3NqVoaBXJZI";
    let sessionId = req.body.sessionId;
    try {
        let session = await stripe.checkout.sessions.retrieve(sessionId);

        let customer = await stripe.customers.retrieve(session.customer);

        let professional = await ProfessionalsData.findOne({ _id: session.metadata.professionalId }).select({
            pointsHistory: 1,
            paymentHistory: 1,
            professionalTotalBidPoints: 1
        });
        let eligible = true;
        if(professional.pointsHistory.length > 0){
            let verify = professional.pointsHistory.filter((val) => {
                if (val.transactionId === sessionId) {
                    eligible = false;
                    return 0;
                }
            
            });        
        }
        // console.log(eligible);
        if(eligible === false || !eligible){
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "User Data is saved already"});
        }
        else{
            let data = {
                transactionId: sessionId,
                points: session.metadata.points,
                transactionAmount: session.metadata.amount,
                transactionDes: session.invoice_creation.description,
                des : "Wallet Top up",
                transactionTimeStamp: Date.now(),
                transactionStatus: "success",
                transactionType : "credit",
                professionalId : session.metadata.professionalId
            } ;
            let addTransactionData = await TransactionData.create(data);
            professional.pointsHistory.push(data);
            professional.professionalTotalBidPoints += parseFloat(session.metadata.points);
            await professional.save();
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "User Data saved successfully"});
        }

    }
    catch (e) {
        console.log("Error while checking out for wallet topup of professionals.", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message, });
    }
};

module.exports = addWalletTopupDataProfessionalController;