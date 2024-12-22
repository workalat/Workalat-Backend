const ProfessionalsData = require("../../models/Professional");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function changeMembershipStatusController(req, res){
    try{
        let professoinalId = req.body.professoinalId;
        let choice =  req.body.choice;  //active , cancelled
        let sessionId =  req.body.sessionId;  //active , cancelled
        console.log(req.body);
        let professional = await ProfessionalsData.findOne({_id : professoinalId}).select({
            isMembership : 1,
            membershipStatus : 1,
            profileStatus : 1,
            membershipLeads : 1,
            memberShipExpirationDate : 1
        });
        if(professional === null){
            throw new Error("No professional found.")
        }

        if(choice == "cancelled"){

        // Step 1: Retrieve the Checkout Session
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Step 2: Get the Subscription ID from the session
        const subscriptionId = session.subscription;
        console.log("subscriptionId", subscriptionId);

        if (!subscriptionId) {
            throw new Error('Subscription not found for the session.');
        }

        // Step 3: Cancel the Subscription
        const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

        console.log('Subscription canceled successfully:', canceledSubscription);

        }
        
        // professional.membershipStatus = choice ===  "active" ? "active" : "cancelled" ;
        // professional.isMembership =  choice ===  "active" ? true : false;
        // professional.profileStatus = choice ===  "active" ? "premium" : "normal";
        // professional.membershipLeads =choice === "active" ? professional.membershipLeads + 5 :  professional.membershipLeads - 5;
        
        // const now = new Date();
        // if(choice ===  "active" ){
        //     professional.memberShipExpirationDate = new Date(now.setDate(now.getDate() + 30)).toISOString();
        // }else{
        //     professional.memberShipExpirationDate = new Date(now.setDate(now.getDate() + 0)).toISOString();
        // }
        // await professional.save();
        
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : `Membership status ${choice === "active" ? "Activated" : "Cancelled" } successfully.` });

    }
    catch(e){
        console.log("Error while Fetching Single User Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = changeMembershipStatusController;