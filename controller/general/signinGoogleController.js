let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");

async function signinGoogleController(req, res) {
    try {
        let userFName = req.body.userFName;
        let userLName = req.body.userLName;
        let userFullName = req.body.userFullName;
        let email = req.body.email;
        let userPictureLink = req.body.userPictureLink;
        let verify = req.body.verify;
        let userType = req.body.userType;
        let professionalService = req.body.professionalService;
 
        console.log(req.body);
        if (userType === "client") {
            let data = await ClientsData.findOne({ clientEmail: email });
            console.log(data);
            if (data === null) {
                
                let dates ={
                    passwordLast: Date.now(),
                    twoFactAuthLast : Date.now(),
                    kycLast: Date.now(),
                    phoneLast: Date.now()
                };
                let clientDataCreation = await ClientsData.create({
                    clientFName: userFName,
                    clientLName: userLName,
                    clientFullName: userFullName,
                    clientEmail: email,
                    isClientEmailVerify: verify,
                    clientPictureLink: userPictureLink,
                    isClientPicture: true,
                    clientRegisterationType: "google",
                    registerAs: "client",
                    ChangingDates : dates

                });
                let token = await clientDataCreation.generateAuthToken();
                res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: clientDataCreation._id, userType: "client", message: "Account creation Successfull.", isTwoFactAuth: clientDataCreation.isTwoFactAuth, token: token, newAccount : true })
            }
            else {
                // console.log(data.clientRegisterationType, verify)
                if (data.registerAs === "client") {

                    if (data.clientRegisterationType === 'google') {
                        // console.log("REached 2");
                        if (data.isClientEmailVerify === true && data.isTwoFactAuth === false) {
                            // console.log("REached 3");
                            let token = await data.generateAuthToken();
                            data.lastLoginDate = Date.now();
                            await data.save();
                            // console.log("Token : ", token);
                            res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: data._id, userType: "client", message: "User Logged in Successfully", isTwoFactAuth: data.isTwoFactAuth, emailVerified: data.isClientEmailVerify, token: token, newAccount : false });
                        }
                        else {
                            sendOtpVerificationEmail({ _id: data._id, email: data.clientEmail, userType: "client", verificationType: "email", verificationFor: "signin verification", type: "client" }, res);
                        }
                    }
                    else {
                        throw Error("Please use Another Email");
                    }
                }
                else {
                    let professionalCheck = await ProfessionalsData.findOne({ professionalEmail: email });
                    if (professionalCheck !== null) {
                        if (professionalCheck.isprofessionalEmailVerify === true && professionalCheck.isTwoFactAuth === false) {
                            // console.log("REached 3");
                            let token = await professionalCheck.generateAuthToken();
                            // console.log("Token : ", token);
                            data.lastLoginDate = Date.now();
                            await data.save();
                            res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: professionalCheck._id, userType: "professional", message: "User Logged in Successfully", isTwoFactAuth: professionalCheck.isTwoFactAuth, emailVerified: professionalCheck.isprofessionalEmailVerify, token: token, newAccount : false });
                        }
                        else {
                            sendOtpVerificationEmail({ _id: professionalCheck._id, email: professionalCheck.clientEmail, userType: "professional", verificationType: "email", verificationFor: "signin verification", type: "professional" }, res);
                        }
                    }
                    else {
                        throw Error("Please use Another Email.");
                    }
                }
            }
        }
        else {
            let data = await ProfessionalsData.findOne({ professionalEmail: email });
            console.log(data);
            if (data !== null) {
                if (data.registerAs === "professional") {
                    console.log("HERE")
                    
                    console.log(verify , data.professionalRegisterationType)
                    if (data.professionalRegisterationType === "google") {
                        if (data.isprofessionalEmailVerify === true && data.isTwoFactAuth === false) {
                            let token = await data.generateAuthToken();
                            data.lastLoginDate = Date.now();
                            await data.save();
                            res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: data._id, userType: "professional", message: "User Logged in Successfully", isTwoFactAuth: data.isTwoFactAuth, emailVerified: data.isprofessionalEmailVerify, token: token, newAccount : false });
                        }
                        else {
                            sendOtpVerificationEmail({ _id: data._id, email: data.professionalEmail, userType: "professional", verificationType: "email", verificationFor: "signin verification", type: "professional" }, res);
                        }
                    }
                    else {
                        throw Error("Please use Another Email.");
                    }
                }
                else {
                    let clientCheck = await ClientsData.findOne({ clientEmail: email });
                    if (clientCheck !== null) {
                        if (clientCheck.isClientEmailVerify === true && clientCheck.isTwoFactAuth === false) {
                            // console.log("REached 3");
                            let token = await clientCheck.generateAuthToken();
                            data.lastLoginDate = Date.now();
                            await data.save();
                            // console.log("Token : ", token);
                            res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: clientCheck._id, userType: "client", message: "User Logged in Successfully", isTwoFactAuth: clientCheck.isTwoFactAuth, emailVerified: clientCheck.isClientEmailVerify, token: token, newAccount : false });
                        }
                        else {
                            sendOtpVerificationEmail({ _id: clientCheck._id, email: clientCheck.clientEmail, userType: "client", verificationType: "email", verificationFor: "signin verification", type: "client" }, res);
                        }
                    }
                    else {
                        throw Error("Please use Another Email.");
                    }

                }
            }
            else {
                
                let dates ={
                    passwordLast: Date.now(),
                    twoFactAuthLast : Date.now(),
                    kycLast: Date.now(),
                    phoneLast: Date.now()
                };
                let professionalDataCreation = await ProfessionalsData.create({
                    professionalFName: userFName,
                    professionalLName: userLName,
                    professionalFullName: userFullName,
                    professionalEmail: email,
                    isprofessionalEmailVerify: verify,
                    professionalPictureLink: userPictureLink,
                    isClientPicture: true,
                    professionalRegisterationType: "google",
                    registerAs: "professional",
                    ChangingDates : dates,
                    professionalPrimaryService : professionalService

                });
                let token = await professionalDataCreation.generateAuthToken();
                res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: professionalDataCreation._id, userType: "professional", message: "Account creation Successfull.", isTwoFactAuth: professionalDataCreation.isTwoFactAuth, token: token, newAccount : true })
            }

        }
    }
    catch (e) {
        console.log("Error in signing in client with email", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};

module.exports = signinGoogleController;