const AdminFeaturesData = require("../../models/AdminFeatures");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
const TransactionData = require("../../models/Transaction");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function payAsYouGoProjectController(req, res) {
    try {
        let sessionId = req.body.sessionId;
        let session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log(session);

        let professional = await ProfessionalsData.findOne({ _id: session.metadata.professionalId }).select({
            pointsHistory: 1,
            paymentHistory: 1,
            professionalTotalBidPoints: 1
        });
        let project = await ProjectsData.findOne({_id : session.metadata.projectId}).select({maxBid : 1})

        let eligible = true;
        if (professional.pointsHistory.length > 0) {
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
                des : "Leads Purchase",
                transactionTimeStamp: Date.now(),
                transactionStatus: "success",
                transactionType : "credit",
                professionalId : session.metadata.professionalId
            }
            let addTransactionData = await TransactionData.create(data);
            professional.pointsHistory.push(data);
            professional.professionalTotalBidPoints += parseFloat(session.metadata.points);
            
            project.maxBid -=1;

            await professional.save();
            await project.save();
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "User Data saved successfully"});
        }

    }
    catch (e) {
        console.log("Error while adding professional's details", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};

module.exports = payAsYouGoProjectController;