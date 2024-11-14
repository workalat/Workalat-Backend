let ProfessionalsData = require("../../models/Professional");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function walletTopupProfessionalController(req, res){
    let amount = req.body.amount;
    let points = req.body.points;
    let professionalId = req.body.professionalId;
    try{
        let product = await stripe.products.create({
            name : `Wallet Topup  | £${amount} (+£${(amount* 0.2).toFixed(1)})VAT`
        });
        if(product){
            let price = await stripe.prices.create({
                product : `${product.id}`,
                unit_amount : (amount*100) + (amount*100) * 0.2,
                currency : "gbp"
            });
            if(price.id){ 
                let professionalData= await ProfessionalsData.findOne({_id : professionalId}).select({
                    professionalFullName : 1,
                    professionalEmail : 1,
                    professionalPhoneNo : 1, 
                    professionalCountryCode : 1
                });
                console.log(professionalData);
                if(professionalData === null){
                    res.status(400).json({status : "fail", userStatus : "FAILED", message : "No user Found", data: []})
                }
                let customer = await stripe.customers.create({
                    email: professionalData.professionalEmail,
                    name: professionalData.professionalFullName,
                    phone: professionalData.professionalCountryCode+" "+professionalData.professionalPhoneNo,
                });
                let session = await stripe.checkout.sessions.create({
                    line_items : [{
                        price : `${price.id}`,
                        quantity : 1
                    }], 
                    mode : "payment",
                    success_url : `${process.env.CLIENT_URL}/wallet/success?sessionId={CHECKOUT_SESSION_ID}`,
                    cancel_url : `${process.env.CLIENT_URL}/wallet/`,
                    customer: customer.id,
                    metadata: {
                        points : points,
                        amount : amount,
                        professionalId : professionalId,
                        professionalEmail : professionalData.professionalEmail,
                        professionalFullName : professionalData.professionalFullName,
                        professionalPhoneNo : professionalData.professionalPhoneNo,
                        professionalCountryCode : professionalData.professionalCountryCode,
                    },
                    invoice_creation: {
                        enabled: true,
                        invoice_data: {
                            description: `wallet topup by ${professionalId} of points ${points} and paid £ ${amount}`,
                        }
                    }
                });
                res.status(200).json({status : "success", userStatus : "SUCCESS" , message : "Payment Session generated successfully" ,session : session});
            }
        }
    }
    catch(e){
        console.log("Error while checking out for wallet topup of professionals.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message, });
    }
};

module.exports = walletTopupProfessionalController;