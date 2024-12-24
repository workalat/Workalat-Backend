const ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function professionalDetailsController(req, res){
    let professionalId = req.body.professionalId;
    // console.log(professionalId);
    try{       
        let data = await ProfessionalsData.findOne({$and : [{_id : professionalId}, {adminAccessProfessional : true}]}).select({
            professionalFullName : 1 ,
            isprofessionalPicture : 1,
            professionalPictureLink : 1,
            professionalCountry  : 1,
            accountCreationDate : 1,
            professionalBio : 1,
            reviews : 1,
            totalRatings : 1,
            totalReviews : 1, 
            isPaymentVerify : 1,
            isprofessionalEmailVerify : 1,
            isprofessionalPhoneNoVerify : 1,
            kycStatus : 1,
            professionalPrimaryService : 1,
            professional_level : 1,
            totalProjectsCompleted : 1,
            professionalSkills : 1
        });
        if(data !== null){
            
              // Convert the document to a plain object to allow modifications
              let dataObj = data.toObject();
              let finalData = await Promise.all(dataObj.reviews.map(async (val, i)=>{
                      let clientData = await ClientsData.findOne({_id : val.giverId}).select({
                          clientCountry : 1, 
                      });
                      let updateData = { ...val._doc }; // "_doc" is used to access the actual document
                      if(clientData !== null){
                          updateData.giverCountry = clientData.clientCountry;
                      };
                      return {
                          ...val, // Retain original proposal properties
                          ...(clientData && { giverCountry: clientData.clientCountry }) // Add professionalCountry only if available
                      };
                  
              }));
              dataObj.reviews = finalData;
              res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Data fetched successfully", data: dataObj});
        }
        else{
            throw new Error("No Data Found")
            // res.status(400).json({status : "fail", userStatus : "FAIL", message : "No Data Found" ,data : null});
        }
    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = professionalDetailsController;