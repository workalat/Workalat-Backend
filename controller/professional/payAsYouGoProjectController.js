const AdminFeaturesData = require("../../models/AdminFeatures");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function payAsYouGoProjectController(req, res){
        let projectId = req.body.projectId;
        let professionalId  = req.body.professionalId;
        // let successUrl = req.body.successUrl;
        try{
            let projectData = await ProjectsData.findOne({_id : projectId});
            let professionalData = await ProfessionalsData.findOne({_id : professionalId});
            let adminFeatureData  = await AdminFeaturesData.findOne().select({points : 1});
            let amount;
            adminFeatureData.points.map((val)=>{
                console.log(val.point , projectData.pointsNeeded)
                if(val.point === projectData.pointsNeeded){
                    
                    amount = val.amount
                }
            })
            console.log("amount" , amount);
            if(projectData !== null && professionalData!== null){
                if(projectData.maxBid<1){
                    res.status(400).json({status : "fail", userStatus: "FAIL", message : "You can not bid on this project, beause the maximum number of bid on this project has been reached"})   
                }
                let product = await stripe.products.create({
                    name : `${projectData.serviceTitle.toUpperCase()} |  ${projectData.serviceNeeded.toUpperCase()}`
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
                            success_url : `${process.env.CLIENT_URL}/leads/success?sessionId={CHECKOUT_SESSION_ID}`,
                            cancel_url : `${process.env.CLIENT_URL}/leads/`,
                            metadata: {
                                points : projectData.pointsNeeded,
                                projectId : projectId,
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
                                    description: `Amount paid for the project ${projectId} by ${professionalId} of points ${projectData.pointsNeeded} and paid £ ${amount}`,
                                }
                            }
                        });
                        res.status(200).json({status : "success", userStatus : "SUCCESS" , message : "Payment Session generated successfully" ,session : session});
                    }
                }
            }
            else{
                res.status(400).json({status : "fail", userStatus: "FAIL", message : "Wrong credentials, please login again"})
            }
        }
        catch(e){
            console.log("Error while adding professional's details", e);
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
        }
};

module.exports = payAsYouGoProjectController;