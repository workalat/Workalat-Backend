// let ClientsData = require("../../models/Client");
// let ProfessionalsData = require("../../models/Professional");
// let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");

// let bcrypt = require("bcryptjs");

// async function signinEmailController(req, res){
//     try{
//         let email = req.body.email;
//         let pass = req.body.pass;
//         let userType = req.body.userType;
//         console.log(req.body);

//         let clientCheck = await ClientsData.findOne({clientEmail : email});
//         if(clientCheck !== null && userType === "client"){
//             console.log("Client")
//             let checkAccountType  = clientCheck.registerAs;
//             if(checkAccountType === "client"){
//                 console.log("client>client")
//                 let isPass = clientCheck.clientPassword;
//                 console.log(isPass);
//                 if(isPass || isPass !== null){
//                     let verify = await bcrypt.compare(pass, clientCheck.clientPassword);
//                     console.log(verify)
//                     if(verify || verify === true){
//                         if(clientCheck.isClientEmailVerify === true && clientCheck.isTwoFactAuth === false){ //If the email is not verified or 2FA is enabled, then we will aske them to verify their email
//                                 let token = await clientCheck.generateAuthToken();
//                                 clientCheck.lastLoginDate = Date.now();
//                                 await clientCheck.save();
//                                 res.status(200).json({status : "success", userStatus : "SUCCESS" ,sso : false, userType: "client" ,message : "User Logged in Successfully",emailVerified : clientCheck.isClientEmailVerify ,token: token ,});
//                             }
//                             else{ 
//                                 sendOtpVerificationEmail({_id: clientCheck._id, email: clientCheck.clientEmail, userType : "client" ,verificationType: "email" ,verificationFor : "signin verification", type: "client"}, res);
//                             }
//                     }
//                     else{
//                         res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : false, userType: "client" ,message : "The email or password is wrong.",emailVerified : clientCheck.isClientEmailVerify ,token: null});
//                     }
//                 }
//                 else{
//                     res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : true , userType: "client" ,message : "The email or password is wrong.",emailVerified : clientCheck.isClientEmailVerify ,token: null});
//                  }
//             }
//             else{
//                 console.log("client>professoinal")
//                 let professionalCheck = await ProfessionalsData.findOne({professionalEmail : email});
//                 // console.log(professionalCheck);
//                 let isPass = professionalCheck.professionalPassword;
//                 if(isPass || isPass.length>0){
//                     let verify = await bcrypt.compare(pass, professionalCheck.professionalPassword);
//                     if(verify || verify === true){
//                         if(professionalCheck.isprofessionalEmailVerify === true && professionalCheck.isTwoFactAuth === false){ //If the email is not verified or 2FA is enabled, then we will aske them to verify their email
//                                 let token = await professionalCheck.generateAuthToken();
//                                 professionalCheck.lastLoginDate = Date.now();
//                                 await professionalCheck.save();
//                                 res.status(200).json({status : "success", userStatus : "SUCCESS" ,sso : false, userType: "professional" ,message : "User Logged in Successfully",emailVerified : professionalCheck.isprofessionalEmailVerify ,token: token ,});
//                             }
//                             else{ 
//                                 sendOtpVerificationEmail({_id: professionalCheck._id, email: professionalCheck.professionalEmail, userType : "professional" ,verificationType: "email" ,verificationFor : "signin verification", type: "professional"}, res);
//                             }
//                     }
//                     else{
//                         res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : false, userType: "professional" ,message : "The email or password is wrong.",emailVerified : professionalCheck.isprofessionalEmailVerify ,token: null});
//                     }
//                 }
//                 else{
//                     res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : true , userType: "professional" ,message : "The email or password is wrong.",emailVerified : professionalCheck.isprofessionalEmailVerify ,token: null});
//                 }

//             }
//         }
        
//         else{
//             console.log("Professional")
//             let professionalCheck = await ProfessionalsData.findOne({professionalEmail: email});
//             // console.log(professionalCheck);
//             if(professionalCheck !== null && userType === "professional"){
//                 console.log("Profesional confrimed")
//                 let checkAccountType  = professionalCheck.registerAs;
//                 console.log("Account Type", checkAccountType);
//                 if(checkAccountType === "professional"){
//                     console.log("professional>professional")
//                     let isPass = professionalCheck.professionalPassword;
//                     if(isPass || isPass.length>0){
//                         let verify = await bcrypt.compare(pass, professionalCheck.professionalPassword);
//                         if(verify || verify === true){
//                             if(professionalCheck.isprofessionalEmailVerify === true && professionalCheck.isTwoFactAuth === false){ //If the email is not verified or 2FA is enabled, then we will aske them to verify their email
//                                     let token = await professionalCheck.generateAuthToken();
//                                     professionalCheck.lastLoginDate = Date.now();
//                                     await professionalCheck.save();
//                                     res.status(200).json({status : "success", userStatus : "SUCCESS" ,sso : false, userType: "professional" ,message : "User Logged in Successfully",emailVerified : professionalCheck.isprofessionalEmailVerify ,token: token ,});
//                                 }
//                                 else{ 
//                                     sendOtpVerificationEmail({_id: professionalCheck._id, userType : "professional" ,email: professionalCheck.professionalEmail, verificationType: "email" ,verificationFor : "signin verification", type: "professional"}, res);
//                                 }
//                         }
//                         else{
//                             res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : false, userType: "professional" ,message : "The email or password is wrong.",emailVerified : professionalCheck.isprofessionalEmailVerify ,token: null});
//                         }
//                     }
//                     else{
//                         res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : true , userType: "professional" ,message : "The email or password is wrong.",emailVerified : professionalCheck.isprofessionalEmailVerify ,token: null});
//                     }
//                 }
//                 else{
//                     console.log("Professional>Client")
//                 let clientCheck = await ClientsData.findOne({clientEmail  : email});
//                 let isPass = clientCheck.clientPassword;
//                 if(isPass || isPass.length>0){
//                     let verify = await bcrypt.compare(pass, clientCheck.clientPassword);
//                     if(verify || verify === true){
//                         if(clientCheck.isClientEmailVerify === true && clientCheck.isTwoFactAuth === false){ //If the email is not verified or 2FA is enabled, then we will aske them to verify their email
//                                 let token = await clientCheck.generateAuthToken();
//                                 clientCheck.lastLoginDate = Date.now();
//                                 await clientCheck.save();
//                                 res.status(200).json({status : "success", userStatus : "SUCCESS" ,sso : false, userType: "client" ,message : "User Logged in Successfully",emailVerified : clientCheck.isClientEmailVerify ,token: token ,});
//                             }
//                             else{ 
//                                 sendOtpVerificationEmail({_id: clientCheck._id, email: clientCheck.clientEmail, userType : "client"  ,verificationType: "email" ,verificationFor : "signin verification", type: "client"}, res);
//                             }
//                     }
//                     else{
//                         res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : false, userType: "client" ,message : "The email or password is wrong.",emailVerified : clientCheck.isClientEmailVerify ,token: null});
//                     }
//                 }
//                 else{
//                     res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : true , userType: "client" ,message : "The email or password is wrong.",emailVerified : clientCheck.isClientEmailVerify ,token: null});
//                 }
//                 }
//             }
//             else{
//                 res.status(400).json({status : "fail", userStatus : "FAIL" ,sso : true , userType: null ,message : "No Account Found",emailVerified : false ,token: null});
//             }

//         }

//     }
//     catch(e){
//         console.log("Error in signing in client with email", e);
//         res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
//     }
// };

// module.exports = signinEmailController;


let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");
let bcrypt = require("bcryptjs");

async function signinEmailController(req, res) {
    try {
        let email = req.body.email;
        let pass = req.body.pass;
        let userType = req.body.userType;
        console.log(req.body);

        // Check if the user is a client first
        let clientCheck = await ClientsData.findOne({ clientEmail: email });
        
        if (clientCheck !== null && userType === "client") {
            console.log("Client");
            let checkAccountType = clientCheck.registerAs;

            if (checkAccountType === "client") {
                console.log("client>client");
                let isPass = clientCheck.clientPassword;

                if (isPass || isPass !== null) {
                    let verify = await bcrypt.compare(pass, clientCheck.clientPassword);
                    console.log(verify);

                    if (verify) {
                        // Check email verification and 2FA
                        if (clientCheck.isClientEmailVerify === true && clientCheck.isTwoFactAuth === false) {
                            let token = await clientCheck.generateAuthToken();
                            clientCheck.lastLoginDate = Date.now();
                            await clientCheck.save();
                            res.status(200).json({
                                status: "success",
                                userStatus: "SUCCESS",
                                sso: false,
                                userType: "client",
                                message: "User Logged in Successfully",
                                emailVerified: clientCheck.isClientEmailVerify,
                                token: token,
                            });
                        } else {
                            sendOtpVerificationEmail({
                                _id: clientCheck._id,
                                email: clientCheck.clientEmail,
                                userType: "client",
                                verificationType: "email",
                                verificationFor: "signin verification",
                                type: "client"
                            }, res);
                        }
                    } else {
                        res.status(400).json({
                            status: "fail",
                            userStatus: "FAIL",
                            sso: false,
                            userType: "client",
                            message: "The email or password is wrong.",
                            emailVerified: clientCheck.isClientEmailVerify,
                            token: null
                        });
                    }
                } else {
                    res.status(400).json({
                        status: "fail",
                        userStatus: "FAIL",
                        sso: true,
                        userType: "client",
                        message: "The email or password is wrong.",
                        emailVerified: clientCheck.isClientEmailVerify,
                        token: null
                    });
                }
            } else {
                console.log("client>professional");
                let professionalCheck = await ProfessionalsData.findOne({ professionalEmail: email });
                let isPass = professionalCheck.professionalPassword;

                if (isPass || isPass.length > 0) {
                    let verify = await bcrypt.compare(pass, professionalCheck.professionalPassword);
                    if (verify) {
                        // Check email verification and 2FA
                        if (professionalCheck.isprofessionalEmailVerify === true && professionalCheck.isTwoFactAuth === false) {
                            let token = await professionalCheck.generateAuthToken();
                            professionalCheck.lastLoginDate = Date.now();
                            await professionalCheck.save();
                            res.status(200).json({
                                status: "success",
                                userStatus: "SUCCESS",
                                sso: false,
                                userType: "professional",
                                message: "User Logged in Successfully",
                                emailVerified: professionalCheck.isprofessionalEmailVerify,
                                token: token,
                            });
                        } else {
                            sendOtpVerificationEmail({
                                _id: professionalCheck._id,
                                email: professionalCheck.professionalEmail,
                                userType: "professional",
                                verificationType: "email",
                                verificationFor: "signin verification",
                                type: "professional"
                            }, res);
                        }
                    } else {
                        res.status(400).json({
                            status: "fail",
                            userStatus: "FAIL",
                            sso: false,
                            userType: "professional",
                            message: "The email or password is wrong.",
                            emailVerified: professionalCheck.isprofessionalEmailVerify,
                            token: null
                        });
                    }
                } else {
                    res.status(400).json({
                        status: "fail",
                        userStatus: "FAIL",
                        sso: true,
                        userType: "professional",
                        message: "The email or password is wrong.",
                        emailVerified: professionalCheck.isprofessionalEmailVerify,
                        token: null
                    });
                }
            }
        } else {
            console.log("Professional");
            let professionalCheck = await ProfessionalsData.findOne({ professionalEmail: email });

            if (professionalCheck !== null && userType === "professional") {
                console.log("Professional confirmed");
                let checkAccountType = professionalCheck.registerAs;
                console.log("Account Type", checkAccountType);

                if (checkAccountType === "professional") {
                    console.log("professional>professional");
                    let isPass = professionalCheck.professionalPassword;

                    if (isPass || isPass.length > 0) {
                        let verify = await bcrypt.compare(pass, professionalCheck.professionalPassword);
                        if (verify) {
                            // Check email verification and 2FA
                            if (professionalCheck.isprofessionalEmailVerify === true && professionalCheck.isTwoFactAuth === false) {
                                let token = await professionalCheck.generateAuthToken();
                                professionalCheck.lastLoginDate = Date.now();
                                await professionalCheck.save();
                                res.status(200).json({
                                    status: "success",
                                    userStatus: "SUCCESS",
                                    sso: false,
                                    userType: "professional",
                                    message: "User Logged in Successfully",
                                    emailVerified: professionalCheck.isprofessionalEmailVerify,
                                    token: token,
                                });
                            } else {
                                sendOtpVerificationEmail({
                                    _id: professionalCheck._id,
                                    userType: "professional",
                                    email: professionalCheck.professionalEmail,
                                    verificationType: "email",
                                    verificationFor: "signin verification",
                                    type: "professional"
                                }, res);
                            }
                        } else {
                            res.status(400).json({
                                status: "fail",
                                userStatus: "FAIL",
                                sso: false,
                                userType: "professional",
                                message: "The email or password is wrong.",
                                emailVerified: professionalCheck.isprofessionalEmailVerify,
                                token: null
                            });
                        }
                    } else {
                        res.status(400).json({
                            status: "fail",
                            userStatus: "FAIL",
                            sso: true,
                            userType: "professional",
                            message: "The email or password is wrong.",
                            emailVerified: professionalCheck.isprofessionalEmailVerify,
                            token: null
                        });
                    }
                } else {
                    console.log("Professional>Client");
                    let clientCheck = await ClientsData.findOne({ clientEmail: email });
                    let isPass = clientCheck.clientPassword;

                    if (isPass || isPass.length > 0) {
                        let verify = await bcrypt.compare(pass, clientCheck.clientPassword);
                        if (verify) {
                            // Check email verification and 2FA
                            if (clientCheck.isClientEmailVerify === true && clientCheck.isTwoFactAuth === false) {
                                let token = await clientCheck.generateAuthToken();
                                clientCheck.lastLoginDate = Date.now();
                                await clientCheck.save();
                                res.status(200).json({
                                    status: "success",
                                    userStatus: "SUCCESS",
                                    sso: false,
                                    userType: "client",
                                    message: "User Logged in Successfully",
                                    emailVerified: clientCheck.isClientEmailVerify,
                                    token: token,
                                });
                            } else {
                                sendOtpVerificationEmail({
                                    _id: clientCheck._id,
                                    email: clientCheck.clientEmail,
                                    userType: "client",
                                    verificationType: "email",
                                    verificationFor: "signin verification",
                                    type: "client"
                                }, res);
                            }
                        } else {
                            res.status(400).json({
                                status: "fail",
                                userStatus: "FAIL",
                                sso: false,
                                userType: "client",
                                message: "The email or password is wrong.",
                                emailVerified: clientCheck.isClientEmailVerify,
                                token: null
                            });
                        }
                    } else {
                        res.status(400).json({
                            status: "fail",
                            userStatus: "FAIL",
                            sso: true,
                            userType: "client",
                            message: "The email or password is wrong.",
                            emailVerified: clientCheck.isClientEmailVerify,
                            token: null
                        });
                    }
                }
            } else {
                res.status(400).json({
                    status: "fail",
                    userStatus: "FAIL",
                    sso: true,
                    userType: null,
                    message: "No Account Found",
                    emailVerified: false,
                    token: null
                });
            }
        }
    } catch (e) {
        console.log("Error in signing in client with email", e);
        res.status(400).json({
            status: "fail",
            userStatus: "FAILED",
            message: e.message
        });
    }
}

module.exports = signinEmailController;
