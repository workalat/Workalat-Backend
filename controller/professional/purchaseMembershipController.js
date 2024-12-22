// const ProfessionalsData = require("../../models/Professional");
// let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// async function purchaseMembershipController(req, res){
//     let professionalId  = req.body.professionalId;
//     let memberShipAmount = 34.99;
//     let totalAmount = parseFloat(memberShipAmount);
//     try{
        
//         let professionalData = await ProfessionalsData.findOne({_id : professionalId});
        
//         if(professionalData === null ){
//             throw new Error("No Data Found, please login again.")
//         } 

//         let product = await stripe.products.create({
//             // name : `Membership Purchase  | £${memberShipAmount} (+£${taxOnMembershipAmount}) VAT`
//             name : `Membership Purchase  | £${memberShipAmount}`
//         });

//         if(product){
//             let price = await stripe.prices.create({
//                 product : `${product.id}`,
//                 unit_amount : Math.round(totalAmount * 100),
//                 currency : "gbp"
//             });
//             if(price.id){
//                 let session = await stripe.checkout.sessions.create({
//                     line_items : [{
//                         price : `${price.id}`,
//                         quantity : 1
//                     }],
//                     mode : "payment",
//                     success_url : `${process.env.CLIENT_URL}/membership/success?sessionId={CHECKOUT_SESSION_ID}`,
//                     cancel_url :   `${process.env.CLIENT_URL}/membership/`,
//                     metadata: {
//                         professionalId : professionalId,
//                         professionalName : professionalData.professionalFullName,
//                         transactionAmount : memberShipAmount,
//                         transactionAmountTax : 6.998,
//                         totalTransactionAmount : totalAmount,
//                         transactionPurpose : "Membership Purchase",
//                         transactionDes : `Membership purchasing by ${professionalId} paid £${totalAmount}.`,
//                         transactionStatus : "pending"
//                     },
//                     invoice_creation: {
//                         enabled: true,
//                         invoice_data: {
//                             description: `Membership purchasing by ${professionalId} paid £${totalAmount}.`,
//                         }
//                     }
//                 });
//                 res.status(200).json({status : "success", userStatus : "SUCCESS" , message : "Payment Session generated successfully" ,session : session});
//             }
//         }
//     }
//     catch(e){
//         console.log("Error while adding fetching propsals data", e);
//         res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
//     }
// };

// module.exports = purchaseMembershipController;


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ProfessionalsData = require("../../models/Professional");

async function purchaseMembershipController(req, res) {
    try {
        const { professionalId } = req.body;

        // Fetch professional data
        const professionalData = await ProfessionalsData.findOne({ _id: professionalId });
        if (!professionalData) throw new Error("Professional not found");


         // Create or reuse Stripe customer
         let stripeCustomerId = professionalData.stripeCustomerId;
         if (!stripeCustomerId) {
             const customer = await stripe.customers.create({
                 email: professionalData.professionalEmail,
                 name: professionalData.professionalFullName,
             });
             stripeCustomerId = customer.id;
             professionalData.stripeCustomerId = stripeCustomerId;
             await professionalData.save();
         }

        // Generate Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer: stripeCustomerId,
            line_items: [
                {
                    price: process.env.STRIPE_PRODUCT_ID, // Replace with actual Stripe price_id
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.CLIENT_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/membership/cancel`,
            metadata: {
                professionalId,
                professionalName: professionalData.professionalFullName,
                leadsGranted: 5,
                transactionPurpose: "Membership Purchase",
                professionalId : professionalId,
                professionalName : professionalData.professionalFullName,
                transactionAmount : 34.99,
                transactionAmountTax : 6.998,
                totalTransactionAmount : parseFloat(34.99),
                transactionPurpose : "Membership Purchase",
                transactionDes : `Membership purchasing by ${professionalId} paid £${parseFloat(34.99)}.`,
                transactionStatus : "pending"
            },
        });

        res.status(200).json({
            status: "success",
            message: "Checkout session created",
            session,
        });
    } catch (err) {
        console.error("Error generating session:", err.message);
        res.status(400).json({ status: "fail", message: err.message });
    }
}

module.exports = purchaseMembershipController;
