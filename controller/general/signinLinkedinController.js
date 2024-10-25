let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");

async function signinLinkedinController(req, res) {
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
                    isClientEmailVerify: true,
                    clientPictureLink: userPictureLink,
                    isClientPicture: true,
                    clientRegisterationType: "linkedin",
                    registerAs: "client",
                    ChangingDates : dates
                    
                });
                let token = await clientDataCreation.generateAuthToken();
                res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: clientDataCreation._id, userType: "client", message: "Account creation Successfull.", emailVerified: clientDataCreation.isClientEmailVerify ,isTwoFactAuth: clientDataCreation.isTwoFactAuth, token: token })
            }
            else {
                if (data.registerAs === "client") {
                    if ((verify === true || verify) && (data.clientRegisterationType === 'linkedin')) {
                        if (data.isClientEmailVerify === true && data.isTwoFactAuth === false) {
                            let token = await data.generateAuthToken();
                            data.lastLoginDate = Date.now();
                            await data.save();
                            res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: data._id, userType: "client", message: "User Logged in Successfully", emailVerified: data.isClientEmailVerify,isTwoFactAuth: data.isTwoFactAuth ,token: token });
                        }
                        else {
                            sendOtpVerificationEmail({ _id: data._id, email: data.clientEmail, userType: "client", verificationType: "linkedin", verificationFor: "signin verification", type: "client" }, res);
                        }
                    }
                    else {
                        throw Error("This email maybe registered with another account or any user with this linkedin account address is not registered here, please check your email or use another account.");
                    }
                }
                else {
                    let professionalCheck = await ProfessionalsData.findOne({ professionalEmail: email });
                    if (professionalCheck !== null) {
                        if (professionalCheck.isprofessionalEmailVerify === true && professionalCheck.isTwoFactAuth === false) {
                            let token = await professionalCheck.generateAuthToken();
                            professionalCheck.lastLoginDate = Date.now();
                            await professionalCheck.save();
                            res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: professionalCheck._id, userType: "professional", message: "User Logged in Successfully", isTwoFactAuth: professionalCheck.isTwoFactAuth, emailVerified: professionalCheck.isprofessionalEmailVerify, token: token });
                        }
                        else {
                            sendOtpVerificationEmail({ _id: professionalCheck._id, email: professionalCheck.clientEmail, userType: "client", verificationType: "email", verificationFor: "signin verification", type: "client" }, res);
                        }
                    }
                    else {
                        throw Error("Any account with this gmail address is not registered here, please check your email or sinup.");
                    }
                }
            }
        }
        else {
            let data = await ProfessionalsData.findOne({ professionalEmail: email });
            console.log(data);
            if (data !== null) {
                if (data.registerAs === "professional") {
                    if ((verify === true || verify) && (data.professionalRegisterationType === "linkedin")) {
                        if (data.isprofessionalEmailVerify === true && data.isTwoFactAuth === false) {
                            let token = await data.generateAuthToken();
                            data.lastLoginDate = Date.now();
                            await data.save();
                            res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: data._id, userType: "professional" ,message: "User Logged in Successfully", isTwoFactAuth: data.isTwoFactAuth, emailVerified: data.isprofessionalEmailVerify, token: token});
                        }
                        else {
                            sendOtpVerificationEmail({ _id: data._id, email: data.professionalEmail, type: "professional", verificationType: "linkedin", verificationFor: "signin verification", type: "professional" }, res);
                        }
                    }
                    else {
                        throw Error("This email maybe registered with another account or any user with this linkedin account is not registered here, please check your email or sinup.");
                    }

                }
                else{
                    
                    let clientCheck = await ClientsData.findOne({ clientEmail: email });
                    if (clientCheck !== null) {
                        if (clientCheck.isClientEmailVerify === true && clientCheck.isTwoFactAuth === false) {
                            let token = await clientCheck.generateAuthToken();
                            clientCheck.lastLoginDate = Date.now();
                            await clientCheck.save();
                            res.status(200).json({ status: "success", userStatus: "VERIFIED", userId: clientCheck._id, userType: "client", message: "User Logged in Successfully", isTwoFactAuth: clientCheck.isTwoFactAuth, emailVerified: clientCheck.isClientEmailVerify, token: token });
                        }
                        else {
                            sendOtpVerificationEmail({ _id: clientCheck._id, email: clientCheck.clientEmail, userType: "client", verificationType: "email", verificationFor: "signin verification", type: "client" }, res);
                        }
                    }
                    else {
                        throw Error("Any account with this email address is not registered here, please check your email or sinup.");
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
                    isprofessionalEmailVerify: true,
                    professionalPictureLink: userPictureLink,
                    isClientPicture: true,
                    professionalRegisterationType: "linkedin",
                    registerAs: "professional",
                    ChangingDates : dates,
                    professionalPrimaryService : professionalService

                });
                let token = await professionalDataCreation.generateAuthToken();
                res.status(200).json({ status: "success", userStatus: "SUCCESS", userId: professionalDataCreation._id, userType: "professional", message: "Account creation Successfull.", isTwoFactAuth: professionalDataCreation.isTwoFactAuth, token: token })
            }

        }
    }
    catch (e) {
        console.log("Error in signing in client with email", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};

module.exports = signinLinkedinController;