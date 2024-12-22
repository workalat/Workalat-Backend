const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");




async function showallCertificateDataController(req, res){
    try{

        let data = await ProfessionalsData.find({isAppliedCertificate : true}).select({
            'certifications.timeStamp' : 1,
            professionalFullName : 1,
            'certifications.status' : 1,
            'certifications.professionalName' : 1,
            'certifications._id' : 1
        }); 
        let finalData = data.flatMap((val) =>
            val.certifications.map((v) => ({
              professionalName: v.professionalName,
              status: v.status,
              timeStamp: v.timeStamp,
              certificateId: v._id,
              userId: val._id,
            }))
          );
      
          console.log(finalData);
        res.status(200).json({status : "success", userStatus : "SUCCESS",  data : finalData.reverse()})
     
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showallCertificateDataController;