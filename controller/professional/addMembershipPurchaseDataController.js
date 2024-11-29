const AdminFeaturesData = require("../../models/AdminFeatures");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function addMembershipPurchaseDataController(req, res) {
    try {
        let sessionId = req.body.sessionId;
        let session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log(session);

        let professional = await ProfessionalsData.findOne({ _id: session.metadata.professionalId });

        let eligible = true;
        if (professional.membershipTransactionHistory.length > 0) {
            let verify = professional.membershipTransactionHistory.filter((val) => {
                if (val.transactionId === sessionId) {
                    eligible = false;
                    return 0;
                }
            });
        }
         // console.log(eligible);
         if(eligible === false || !eligible){
            throw new Error("User Data is saved already")
        }
        else{
            let data = {
                transactionId: sessionId,
                transactionAmount : session.metadata.transactionAmount,
                transactionAmountTax : session.metadata.transactionAmountTax,
                totalTransactionAmount : session.metadata.totalTransactionAmount,
                professionalId : session.metadata.professionalId,
                professionalName : session.metadata.professionalName,
                transactionPurpose : "Membership Purchase",
                transactionDes: session.invoice_creation.description,
                transactionStatus: "success",
                isRequestCancellation : false, 
                timeStamp: Date.now(),
            }
            professional.membershipTransactionHistory.push(data);
            professional.membershipStatus = "pending";
            professional.isMembership = false;
            professional.profileStatus = "normal";
            // professional.membershipLeads += 5;

            const now = new Date();
            professional.memberShipExpirationDate = new Date(now.setDate(now.getDate() + 30)).toISOString();


            await professional.save();
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "User Data saved successfully"});
        }

    }
    catch (e) {
        console.log("Error while adding professional's details", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};

module.exports = addMembershipPurchaseDataController;