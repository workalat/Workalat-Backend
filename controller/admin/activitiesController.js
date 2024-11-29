const AdminData = require("../../models/Admin");
const ProfessionalsData = require("../../models/Professional");
const TransactionData = require("../../models/Transaction");
async function activitiesController(req, res){
    try{
        let data = await TransactionData.find().select({
            transactionType : 0
        }).sort({transactionTimeStamp : -1});
        let finalData = await Promise.all(data.map(async (val, i)=>{
            let professionalData = await ProfessionalsData.findOne({_id : val.professionalId}).select({
                professionalFullName : 1,
                professionalPictureLink : 1,
                isprofessionalEmailVerify : 1,
                professionalPhoneNo : 1,
                kycStatus : 1,

            });
            let updatedData = { ...val._doc }; // "_doc" is used to access the actual document
            if(professionalData !== null){
                updatedData.userName = professionalData.professionalFullName;
                updatedData.userPicture = professionalData.professionalPictureLink;
                updatedData.userVerify = professionalData.isprofessionalEmailVerify && professionalData.isprofessionalEmailVerify ? true : false;
                updatedData.userKycVerify = professionalData.kycStatus === "approved" ? true : false;
                return updatedData;
            };
    }));
    res.status(200).json({status : "success", userStatu : "SUCCESS", message : "Admin created Successfully", data : finalData});
    }
    catch(e){
        console.log("Error while adding Admins", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = activitiesController;