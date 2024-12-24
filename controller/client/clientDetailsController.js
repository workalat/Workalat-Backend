const ClientsData = require("../../models/Client");
const ProfessionalsData = require("../../models/Professional");

async function clientDetailsController(req, res){
    let clientId = req.body.clientId;
    try{       
        let data = await ClientsData.findOne({$and : [{_id : clientId}, {adminAccessClient : true}]}).select({
            clientFullName : 1 ,
            isClientPicture : 1,
            clientPictureLink : 1,
            clientCountry  : 1,
            accountCreationDate : 1, 
            clientBio : 1,
            reviews : 1,
            totalRatings : 1, 
            kycStatus : 1,
            totalReviews : 1,
            isPaymentVerify : 1,
            totalProjectsCompleted : 1,
            isClientEmailVerify : 1,
            isClientPhoneNoVerify : 1,
        });
        if(data === null){
            res.status(400).json({status : "fail", userStatus : "FAIL", message : "No Data Found" ,data : null});
        }
        else{
              // Convert the document to a plain object to allow modifications
              let dataObj = data.toObject();
              let finalData = await Promise.all(dataObj.reviews.map(async (val, i)=>{
                      let professionalData = await ProfessionalsData.findOne({_id : val.giverId}).select({
                          professionalCountry : 1, 
                      });
                      let updateData = { ...val._doc }; // "_doc" is used to access the actual document
                      if(professionalData !== null){
                          updateData.giverCountry = professionalData.professionalCountry;
                      };
                      return {
                          ...val, // Retain original proposal properties
                          ...(professionalData && { giverCountry: professionalData.professionalCountry }) // Add professionalCountry only if available
                      };
                  
              }));
              dataObj.reviews = finalData;
              res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: dataObj});
  
        }
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = clientDetailsController;