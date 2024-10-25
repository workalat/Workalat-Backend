let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function switchIntoClientController(req, res){
    let professionalId = req.body.professionalId;
    try{      
        let clientVerify = await ClientsData.find({professionalId : professionalId});
 
        if(clientVerify.length>0){
            let token = await clientVerify[0].generateAuthToken();
            // console.log(professionalVerify[0])
            // console.log(token)
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Loggedin Successfully", emailVerified : clientVerify[0].isClientEmailVerify ,data : [{token: token}]})
        }
        else{
            let professionalData = await ProfessionalsData.findOne({_id : professionalId});
            console.log(professionalData);
            if( professionalData.professionalPassword !== null){ 
                
                let dates ={
                    passwordLast: Date.now(),
                    twoFactAuthLast : Date.now(),
                    kycLast: Date.now(),
                    phoneLast: Date.now()
                };
            let data = await ClientsData.create({
                professionalId : professionalId,
                clientFullName : professionalData.professionalFullName,
                isClientEmailVerify : professionalData.isprofessionalEmailVerify,
                clientEmail : professionalData.professionalEmail,
                clientPhoneNo : professionalData.professionalPhoneNo,
                isClientPhoneNoVerify : professionalData.isprofessionalPhoneNoVerify,
                isClientPicture : professionalData.isprofessionalPicture,
                clientPictureLink : professionalData.professionalPictureLink,
                clientRegisterationType : professionalData.professionalRegisterationType,
                registerAs : "professional",
                clientCountry : professionalData.professionalCountry,
                clientCountryCode : professionalData.professionalCountryCode,
                clientAddress : professionalData.professionalAddress,
                clientBio : professionalData.professionalBio,
                clientCompanyName : professionalData.professionalCompanyName,
                clientCompanyPhoneNo : professionalData.professionalCompanyPhoneNo,
                clientCompanyAddress : professionalData.professionalCompanyAddress,
                clientDocumentType : professionalData.professionalDocumentType,
                clientDocumentLink : professionalData.professionalDocumentLink,
                clientPassword : professionalData.professionalPassword,
                ChangingDates : dates
            });
            // console.log(data);
            professionalData.clientId = data._id;
            await professionalData.save();
            let token = await data.generateAuthToken();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Client Account Created Successfuly",emailVerified : data.isClientEmailVerify,data : [{token: token}]})

            }
            else{
                
                let dates ={
                    passwordLast: Date.now(),
                    twoFactAuthLast : Date.now(),
                    kycLast: Date.now(),
                    phoneLast: Date.now()
                };
            let data = await ClientsData.create({
                professionalId : professionalId,
                clientFullName : professionalData.professionalFullName,
                isClientEmailVerify : professionalData.isprofessionalEmailVerify,
                clientEmail : professionalData.professionalEmail,
                clientPhoneNo : professionalData.professionalPhoneNo,
                isClientPhoneNoVerify : professionalData.isprofessionalPhoneNoVerify,
                isClientPicture : professionalData.isprofessionalPicture,
                clientPictureLink : professionalData.professionalPictureLink,
                clientRegisterationType : professionalData.professionalRegisterationType,
                registerAs : "professional",
                clientCountry : professionalData.professionalCountry,
                clientCountryCode : professionalData.professionalCountryCode,
                clientAddress : professionalData.professionalAddress,
                clientBio : professionalData.professionalBio,
                clientCompanyName : professionalData.professionalCompanyName,
                clientCompanyPhoneNo : professionalData.professionalCompanyPhoneNo,
                clientCompanyAddress : professionalData.professionalCompanyAddress,
                clientDocumentType : professionalData.professionalDocumentType,
                clientDocumentLink : professionalData.professionalDocumentLink,
                ChangingDates : dates
            });
            // console.log(data);
            professionalData.clientId = data._id;
            await professionalData.save();
            let token = await data.generateAuthToken();
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Client Account Created Successfuly",emailVerified : data.isClientEmailVerify,data : [{token: token}]})

            }
        }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        if(e.message.includes("E11000 duplicate key error collection: workalot.professionaldatas index: professionalEmail_1 dup key:")){
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "Email already exists, please Change Your Email First!"});
            return;
        }
        else{
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
        }
    }
};

module.exports = switchIntoClientController;