const ProfessionalsData = require("../../models/Professional");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function purchaseMembershipController(req, res){
    let professionalId  = req.body.professionalId;
    let memberShipAmount = 34.99;
    // let taxOnMembershipAmount  = 6.998;
    // let totalAmount = parseFloat(memberShipAmount+taxOnMembershipAmount);
    let totalAmount = parseFloat(memberShipAmount);
    // console.log(memberShipAmount,taxOnMembershipAmount,totalAmount);
    // console.log(typeof(memberShipAmount),typeof(taxOnMembershipAmount),typeof(totalAmount));
    // console.log(`${process.env.CLIENT_URL}/membership/success?sessionId={CHECKOUT_SESSION_ID}`)
    try{
        
        let professionalData = await ProfessionalsData.findOne({_id : professionalId});
        
        if(professionalData === null ){
            throw new Error("No Data Found, please login again.")
        }

        let product = await stripe.products.create({
            // name : `Membership Purchase  | £${memberShipAmount} (+£${taxOnMembershipAmount}) VAT`
            name : `Membership Purchase  | £${memberShipAmount}`
        });

        if(product){
            let price = await stripe.prices.create({
                product : `${product.id}`,
                unit_amount : Math.round(totalAmount * 100),
                currency : "gbp"
            });
            if(price.id){
                let session = await stripe.checkout.sessions.create({
                    line_items : [{
                        price : `${price.id}`,
                        quantity : 1
                    }],
                    mode : "payment",
                    success_url : `${process.env.CLIENT_URL}/membership/success?sessionId={CHECKOUT_SESSION_ID}`,
                    cancel_url :   `${process.env.CLIENT_URL}/membership/`,
                    metadata: {
                        professionalId : professionalId,
                        professionalName : professionalData.professionalFullName,
                        transactionAmount : memberShipAmount,
                        transactionAmountTax : 6.998,
                        totalTransactionAmount : totalAmount,
                        transactionPurpose : "Membership Purchase",
                        transactionDes : `Membership purchasing by ${professionalId} paid £${totalAmount}.`,
                        transactionStatus : "pending"
                    },
                    invoice_creation: {
                        enabled: true,
                        invoice_data: {
                            description: `Membership purchasing by ${professionalId} paid £${totalAmount}.`,
                        }
                    }
                });
                res.status(200).json({status : "success", userStatus : "SUCCESS" , message : "Payment Session generated successfully" ,session : session});
            }
        }
    }
    catch(e){
        console.log("Error while adding fetching propsals data", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = purchaseMembershipController;