let AdminFeaturesData = require("../../models/AdminFeatures");
const ProfessionalsData = require("../../models/Professional");
async function certificationApprovalController(req, res){
    try{
        let professionalId = req.body.professionalId;
        let certificationId = req.body.certificationId;
        let adminComment = req.body.adminComment;
        let choice = req.body.choice; //"approved/rejected";

        let professional = await ProfessionalsData.findOne({_id : professionalId}).select({isAppliedCertificate : 1, certifications  : 1});

        if(professional === null){
            throw new Error("Invalid Credentials, No user Data Found");
        }

        let findCertificate = professional.certifications.find((val)=>{
            console.log(val._id , certificationId)
            if(val._id == certificationId){return(val)}
        });

        findCertificate.status = `${(choice === "approved") ? "approved" :"rejected"}`
        findCertificate.adminComment = adminComment;
        await professional.save();
        res.status(200).json({status : "success", userStatus : "SUCCESS", message : `Certification Request ${choice?.toUpperCase()} Successfully`, currentStatus : findCertificate.status});

    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = certificationApprovalController;