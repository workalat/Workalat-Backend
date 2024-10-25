let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function payMilestoneController(req, res){
    try{
        let awardedId = req.body.awardedId;
        let milestoneAmount = req.body.milestoneAmount;
        let milestoneId = req.body.milestoneId;
        let milestoneTitle  = req.body.milestoneTitle;
        let product = await stripe.products.create({
            name : milestoneTitle
        });

        if(product){
            let price = await stripe.prices.create({
                product : `${product.id}`,
                unit_amount : milestoneAmount*100,
                currency : "gbp"
            });

            if(price.id){
                let session = await stripe.checkout.sessions.create({
                    line_items : [{
                        price : `${price.id}`,
                        quantity : 1
                    }],
                    mode : "payment",
                    success_url : "http://localhost:5173/payment-success-milestonePayment/{CHECKOUT_SESSION_ID}",
                    cancel_url : "http://localhost:7000/payment-cancel",
                    metadata: {
                         awardedId : awardedId,
                         milestoneAmount : milestoneAmount,
                         milestoneId : milestoneId,
                         milestoneTitle  : milestoneTitle,
                    },
                    invoice_creation: {
                        enabled: true,
                        invoice_data: {
                            description: `Milestone Payment for awarded project ${awardedId} of amount £ ${milestoneAmount}  for purpose ${milestoneTitle}, milestone ID ${milestoneId}`,
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

module.exports = payMilestoneController;