let ProfessionalsData = require("../../models/Professional");
let AwardedData = require("../../models/Awarded");
const ProjectsData = require("../../models/Project");
const ClientsData = require("../../models/Client");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function switchIntoProfessionalController(req, res){
    let clientId = req.body.clientId;
    try{      
        let professionalVerify = await ProfessionalsData.find({clientId : clientId});

        if(professionalVerify.length>0){
            let token = await professionalVerify[0].generateAuthToken();
            // console.log(professionalVerify[0])
            // console.log(token)
            res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Loggedin Successfully", emailVerified : professionalVerify[0].isprofessionalEmailVerify ,data : [{token: token}]})
        }
        else{
            let clientData = await ClientsData.findOne({_id : clientId});
            if(clientData !== null){
                if(clientData.clientPassword != null){
                    console.log("With password");
                    let dates ={
                        passwordLast: Date.now(),
                        twoFactAuthLast : Date.now(),
                        kycLast: Date.now(),
                        phoneLast: Date.now()
                    };
                
                    let data = await ProfessionalsData.create({
                        professionalPassword : clientData.clientPassword,
                        clientId : clientId,
                        professionalFullName : clientData.clientFullName,
                        isprofessionalEmailVerify : clientData.isClientEmailVerify,
                        professionalEmail : clientData.clientEmail,
                        professionalPhoneNo : clientData.clientPhoneNo,
                        isprofessionalPhoneNoVerify : clientData.isClientPhoneNoVerify,
                        isprofessionalPicture : clientData.isClientPicture,
                        professionalPictureLink : clientData.clientPictureLink,
                        professionalRegisterationType : clientData.clientRegisterationType,
                        registerAs : "client",
                        professionalCountry : clientData.clientCountry,
                        professionalCountryCode : clientData.clientCountryCode,
                        professionalAddress : clientData.clientAddress,
                        professionalBio : clientData.clientBio,
                        professionalCompanyName : clientData.clientCompanyName,
                        professionalCompanyPhoneNo : clientData.clientCompanyPhoneNo,
                        professionalCompanyAddress : clientData.clientCompanyAddress,
                        professionalDocumentType : clientData.clientDocumentType,
                        professionalDocumentLink : clientData.clientDocumentLink,
                        ChangingDates : dates
                    });
                    // console.log(data);
                    clientData.professionalId = data._id;
                    await clientData.save();
                    let token = await data.generateAuthToken();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Professional Account Created Successfuly",emailVerified : clientData.isClientEmailVerify,data : [{token: token}]})
        
                    }
                    else{ 
                        console.log("Without password");
                    let dates ={
                        passwordLast: Date.now(),
                        twoFactAuthLast : Date.now(),
                        kycLast: Date.now(),
                        phoneLast: Date.now()
                    };
                        
                    let data = await ProfessionalsData.create({
                        clientId : clientId,
                        professionalFullName : clientData.clientFullName,
                        isprofessionalEmailVerify : clientData.isClientEmailVerify,
                        professionalEmail : clientData.clientEmail,
                        // professionalPassword : clientData.clientPassword,
                        professionalPhoneNo : clientData.clientPhoneNo,
                        isprofessionalPhoneNoVerify : clientData.isClientPhoneNoVerify,
                        isprofessionalPicture : clientData.isClientPicture,
                        professionalPictureLink : clientData.clientPictureLink,
                        professionalRegisterationType : clientData.clientRegisterationType,
                        registerAs : "client",
                        professionalCountry : clientData.clientCountry,
                        professionalCountryCode : clientData.clientCountryCode,
                        professionalAddress : clientData.clientAddress,
                        professionalBio : clientData.clientBio,
                        professionalCompanyName : clientData.clientCompanyName,
                        professionalCompanyPhoneNo : clientData.clientCompanyPhoneNo,
                        professionalCompanyAddress : clientData.clientCompanyAddress,
                        professionalDocumentType : clientData.clientDocumentType,
                        professionalDocumentLink : clientData.clientDocumentLink,
                        ChangingDates : dates
                    });
                    // console.log(data);
                    clientData.professionalId = data._id;
                    await clientData.save();
                    let token = await data.generateAuthToken();
                    res.status(200).json({status : "success", userStatus : "SUCCESS", message : "Professional Account Created Successfuly",emailVerified : clientData.isClientEmailVerify,data : [{token: token}]})
                    }
            }
            else{
                res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "No user Found, please Login Again"});
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

module.exports = switchIntoProfessionalController;