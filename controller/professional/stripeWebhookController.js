const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Professional = require("../../models/Professional");
const ProcessedEvent = require("../../models/ProcessedEvent");
const TransactionData = require("../../models/Transaction");

async function stripeWebhookController(req, res) {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        // Verify event signature
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        // Check if event has already been processed
        const existingEvent = await ProcessedEvent.findOne({ eventId: event.id });
        if (existingEvent) {
            return res.status(200).send("Event already processed");
        }

        // Save the event as processed
        await ProcessedEvent.create({ eventId: event.id });

        // Handle different event types
        switch (event.type) {

            case "invoice.payment_succeeded":

                const invoice = event.data.object;
                const session = await fetchCheckoutSession(invoice.customer);
                if (session) {
                    await handlePaymentSucceeded(invoice, session);
                    break;
                }
                else{
                    break;
                }

            case "customer.subscription.deleted":
                const invoice2 = event.data.object;
                const session2 = await fetchCheckoutSession("cus_RRNCF0DBpZeIKc");
                if (session2) {
                    await handleSubscriptionCancellation(invoice2,session2);
                    break;
                }
                else{
                    break;
                }
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.status(200).send("Webhook handled successfully");
    } catch (err) {
        // console.error("Error handling webhook:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function fetchCheckoutSession(customerId) {
    try {
        const sessions = await stripe.checkout.sessions.list({
            customer: customerId,
            limit: 1, // Assuming the most recent session is linked
        });

        if (sessions.data.length > 0) {
            return sessions.data[0]; // Return the most recent session
        }
    } catch (err) {
        console.error('Error fetching checkout session:', err.message);
    }

    return null;
}

const handlePaymentSucceeded = async (invoice, metadata) => {

    const subscriptionId = invoice.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log("subscription", subscription);
    const customerId = subscription.customer;
    const professional = await Professional.findOne({ stripeCustomerId: customerId });

    if (!professional) {
        console.error("Professional not found for customer ID:", customerId);
        return;
    }

        let data = {
            transactionId: metadata?.id,
            transactionAmount : metadata?.metadata?.transactionAmount,
            transactionAmountTax : metadata?.metadata?.transactionAmountTax,
            totalTransactionAmount : metadata?.metadata?.totalTransactionAmount,
            professionalId : metadata?.metadata?.professionalId,
            professionalName : metadata?.metadata?.professionalName,
            transactionPurpose : "Membership Purchase",
            transactionDes: metadata?.invoice_creation?.description,
            transactionStatus: "success",
            isRequestCancellation : false, 
            timeStamp: Date.now(),
        }
        
        let d = {
            transactionId:  metadata?.id,
            points: 5, 
            transactionAmount:metadata?.metadata?.totalTransactionAmount,
            transactionDes: metadata?.invoice_creation?.description,
            des : "Membership Purchase",
            transactionTimeStamp: Date.now(),
            transactionStatus: "success",
            transactionType : "credit",
            professionalId : metadata?.metadata?.professionalId,
        }
        
        await TransactionData.create(d); 

        professional.membershipStatus = "active";
        professional.isMembership =   true ;
        professional.profileStatus = "premium" ;
        professional.membershipLeads = professional.membershipLeads + 5;

        professional.membershipTransactionHistory.push(data);

        const now = new Date();
        professional.memberShipExpirationDate = new Date(now.setDate(now.getDate() + 30)).toISOString();

        await professional.save();
};



const handleSubscriptionCancellation = async (invoice, metadata) => {
    let subscriptionId;
    if(!invoice.subscription || invoice.subscription == null){
        subscriptionId = metadata.subscription;
    }
    else{
        subscriptionId = invoice.subscription;
    }
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const customerId = subscription.customer;
    const professional = await Professional.findOne({ stripeCustomerId: customerId });

    if (!professional) {
        console.error("Professional not found for customer ID:", customerId);
        return;
    }

    let findTransaction = professional.membershipTransactionHistory.find((val)=>{
        if(val.transactionId == metadata?.id){return(val)}
    })

    if(findTransaction === undefined){
        throw new Error("Invalid Transaction ID, please add a valid transaction ID");
    };

    findTransaction.isRequestCancellation = true;
    professional.membershipStatus =  "cancelled" ;
    professional.isMembership =  false;
    professional.profileStatus =  "normal";
    professional.membershipLeads = professional.membershipLeads - 5 <=0 ? 0 : professional.membershipLeads - 5 ;
    await professional.save();
};

module.exports = stripeWebhookController;
