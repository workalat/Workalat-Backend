let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function payCompleteProjectController(req, res){
    try{
        let awardedId = req.body.awardedId;
        
        let award = await AwardedData.findOne({_id : awardedId});
        let amount = award.confirmedPrice - award.paidPrice;
        let product = await stripe.products.create({
            name : "Complete Payment of Project"
        });

        if(product){
            let price = await stripe.prices.create({
                product : `${product.id}`,
                unit_amount : amount*100,
                currency : "gbp"
            });

            if(price.id){
                let session = await stripe.checkout.sessions.create({
                    line_items : [{
                        price : `${price.id}`,
                        quantity : 1
                    }],
                    mode : "payment",
                    success_url : "http://localhost:5173/payment-success-completePayment/{CHECKOUT_SESSION_ID}",
                    cancel_url : "http://localhost:7000/payment-cancel",
                    metadata: {
                         awardedId : awardedId,
                         amount : amount
                    },
                    invoice_creation: {
                        enabled: true,
                        invoice_data: {
                            description: `Complete Payment for awarded project ${awardedId} of amount £ ${amount}.`,
                        }
                    }
                });
                res.status(200).json({status : "success", userStatus : "SUCCESS" , message : "Payment Session generated successfully" ,session : session});
            }
        }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = payCompleteProjectController;