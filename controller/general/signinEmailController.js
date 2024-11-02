let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");
let bcrypt = require("bcryptjs");

async function signinEmailController(req, res) {
    try {
        let email = req.body.email;
        let pass = req.body.pass;
        // let userType = req.body.userType;
        // console.log(req.body);

        let clientsData = await ClientsData.findOne({clientEmail : email});
        let professionalData = await ProfessionalsData.findOne({professionalEmail : email});

        if(clientsData !== null && professionalData === null){  //Check if it's clients account
            if (clientsData.clientPassword || clientsData.clientPassword !== null) { //Check if password is present in the account
                            let verify = await bcrypt.compare(pass, clientsData.clientPassword);

                            if(verify || verify === true){ //Check if the password send is same
                                if(clientsData.isTwoFactAuth || clientsData.isTwoFactAuth === true){
                                    sendOtpVerificationEmail({
                                        _id: clientsData._id,
                                        email: clientsData.clientEmail,
                                        userType: "client",
                                        verificationType: "email",
                                        verificationFor: "signin verification",
                                        type: "client"
                                    }, res);
                                }
                                else{
                                    let token = await clientsData.generateAuthToken();
                                    clientsData.lastLoginDate = Date.now();
                                    await clientsData.save();
                                    res.status(200).json({
                                        status: "success",
                                        userStatus: "SUCCESS",
                                        sso: false,
                                        userType: "client",
                                        message: "User Logged in Successfully",
                                        emailVerified: clientsData.isClientEmailVerify,
                                        token: token,
                                    });
                                }
                            }
                            else{
                                throw new Error("Email or Password is Invalid.")
                            }
            }
            else{
                throw new Error("Email or Password is Invalid.")
            }
            
        }
        else if(clientsData === null && professionalData !== null){ //Check if it's Professional account
            if (professionalData.professionalPassword || professionalData.professionalPassword !== null) { //Check if password is present in the account
                let verify = await bcrypt.compare(pass, professionalData.professionalPassword);

                if(verify || verify === true){ //Check if the password send is same
                    if(professionalData.isTwoFactAuth || professionalData.isTwoFactAuth === true){
                        sendOtpVerificationEmail({
                            _id: professionalData._id,
                            email: professionalData.professionalEmail,
                            userType: "professional",
                            verificationType: "email",
                            verificationFor: "signin verification",
                            type: "professional"
                        }, res);
                    }
                    else{
                        let token = await professionalData.generateAuthToken();
                        professionalData.lastLoginDate = Date.now();
                        await professionalData.save();
                        res.status(200).json({
                            status: "success",
                            userStatus: "SUCCESS",
                            sso: false,
                            userType: "professional",
                            message: "User Logged in Successfully",
                            emailVerified: professionalData.isprofessionalEmailVerify,
                            token: token,
                        });
                    }
                }
                else{
                    throw new Error("Email or Password is Invalid.")
                }
            }
            else{
                throw new Error("Email or Password is Invalid.")
            }

        }
        else if(clientsData !== null && professionalData !== null){
            if((clientsData.clientPassword || clientsData.clientPassword !== null) && (professionalData.professionalPassword || professionalData.professionalPassword !== null)){
                let verifyClient = await bcrypt.compare(pass, clientsData.clientPassword);
            let verifyProfessional = await bcrypt.compare(pass, professionalData.professionalPassword);
            if(verifyClient === true && verifyProfessional === true){
                console.log("Both client and professional");
                if(clientsData.registerAs === "client"){
                    console.log("Register as client");
                    if(clientsData.isTwoFactAuth || clientsData.isTwoFactAuth === true){
                        sendOtpVerificationEmail({
                            _id: clientsData._id,
                            email: clientsData.clientEmail,
                            userType: "client",
                            verificationType: "email",
                            verificationFor: "signin verification",
                            type: "client"
                        }, res);
                    }
                    else{
                        let token = await clientsData.generateAuthToken();
                        clientsData.lastLoginDate = Date.now();
                        await clientsData.save();
                        res.status(200).json({
                            status: "success",
                            userStatus: "SUCCESS",
                            sso: false,
                            userType: "client",
                            message: "User Logged in Successfully",
                            emailVerified: clientsData.isClientEmailVerify,
                            token: token,
                        });
                    }
                }
                else{
                    console.log("Register as PRofessional");
                    if(professionalData.isTwoFactAuth || professionalData.isTwoFactAuth === true){
                        sendOtpVerificationEmail({
                            _id: professionalData._id,
                            email: professionalData.professionalEmail,
                            userType: "professional",
                            verificationType: "email",
                            verificationFor: "signin verification",
                            type: "professional"
                        }, res);
                    }
                    else{
                        let token = await professionalData.generateAuthToken();
                        professionalData.lastLoginDate = Date.now();
                        await professionalData.save();
                        res.status(200).json({
                            status: "success",
                            userStatus: "SUCCESS",
                            sso: false,
                            userType: "professional",
                            message: "User Logged in Successfully",
                            emailVerified: professionalData.isprofessionalEmailVerify,
                            token: token,
                        });
                    }
                }

            }
            else if(verifyClient === true && verifyProfessional === false){
                if(clientsData.isTwoFactAuth || clientsData.isTwoFactAuth === true){
                    sendOtpVerificationEmail({
                        _id: clientsData._id,
                        email: clientsData.clientEmail,
                        userType: "client",
                        verificationType: "email",
                        verificationFor: "signin verification",
                        type: "client"
                    }, res);
                }
                else{
                    let token = await clientsData.generateAuthToken();
                    clientsData.lastLoginDate = Date.now();
                    await clientsData.save();
                    res.status(200).json({
                        status: "success",
                        userStatus: "SUCCESS",
                        sso: false,
                        userType: "client",
                        message: "User Logged in Successfully",
                        emailVerified: clientsData.isClientEmailVerify,
                        token: token,
                    });
                }
            }
            else if(verifyClient === false && verifyProfessional === true){
                if(professionalData.isTwoFactAuth || professionalData.isTwoFactAuth === true){
                    sendOtpVerificationEmail({
                        _id: professionalData._id,
                        email: professionalData.professionalEmail,
                        userType: "professional",
                        verificationType: "email",
                        verificationFor: "signin verification",
                        type: "professional"
                    }, res);
                }
                else{
                    let token = await professionalData.generateAuthToken();
                    professionalData.lastLoginDate = Date.now();
                    await professionalData.save();
                    res.status(200).json({
                        status: "success",
                        userStatus: "SUCCESS",
                        sso: false,
                        userType: "professional",
                        message: "User Logged in Successfully",
                        emailVerified: professionalData.isprofessionalEmailVerify,
                        token: token,
                    });
                }
            }
            else{
                throw new Error("Email or Password is Invalid.")
            }
            }
            else if((clientsData.clientPassword || clientsData.clientPassword !== null) && (!professionalData.professionalPassword || professionalData.professionalPassword === null)){

                let verifyClient = await bcrypt.compare(pass, clientsData.clientPassword);
                if(verifyClient ===  true){
                    if(clientsData.isTwoFactAuth || clientsData.isTwoFactAuth === true){
                        sendOtpVerificationEmail({
                            _id: clientsData._id,
                            email: clientsData.clientEmail,
                            userType: "client",
                            verificationType: "email",
                            verificationFor: "signin verification",
                            type: "client"
                        }, res);
                    }
                    else{
                        let token = await clientsData.generateAuthToken();
                        clientsData.lastLoginDate = Date.now();
                        await clientsData.save();
                        res.status(200).json({
                            status: "success",
                            userStatus: "SUCCESS",
                            sso: false,
                            userType: "client",
                            message: "User Logged in Successfully",
                            emailVerified: clientsData.isClientEmailVerify,
                            token: token,
                        });
                    }
                }
                else{
                    throw new Error("Email or Password is Invalid");
                }
            }
            else if((!clientsData.clientPassword || clientsData.clientPassword === null) && (professionalData.professionalPassword || professionalData.professionalPassword !== null)){
                let verifyProfessional = await bcrypt.compare(pass, professionalData.professionalPassword);
                if(verifyProfessional === true){
                    if(professionalData.isTwoFactAuth || professionalData.isTwoFactAuth === true){
                        sendOtpVerificationEmail({
                            _id: professionalData._id,
                            email: professionalData.professionalEmail,
                            userType: "professional",
                            verificationType: "email",
                            verificationFor: "signin verification",
                            type: "professional"
                        }, res);
                    }
                    else{
                        let token = await professionalData.generateAuthToken();
                        professionalData.lastLoginDate = Date.now();
                        await professionalData.save();
                        res.status(200).json({
                            status: "success",
                            userStatus: "SUCCESS",
                            sso: false,
                            userType: "professional",
                            message: "User Logged in Successfully",
                            emailVerified: professionalData.isprofessionalEmailVerify,
                            token: token,
                        });
                    }
                }
                else{
                    throw new Error("Email or Password is Invalid");
                }
            }
            else{
                throw new Error("Email or Password is Invalid");
            }
        }
        else{
            throw new Error("No Account Found.")
        }













        // // Check if the user is a client first
        // let clientsData = await ClientsData.findOne({ clientEmail: email });
        
        // if (clientCheck !== null && userType === "client") {
        //     console.log("Client");
        //     let checkAccountType = clientCheck.registerAs;

        //     if (checkAccountType === "client") {
        //         console.log("client>client");
        //         let isPass = clientCheck.clientPassword;

        //         if (isPass || isPass !== null) {
        //             let verify = await bcrypt.compare(pass, clientCheck.clientPassword);
        //             console.log(verify);

        //             if (verify) {
        //                 // Check email verification and 2FA
        //                 if (clientCheck.isClientEmailVerify === true && clientCheck.isTwoFactAuth === false) {
        //                     let token = await clientCheck.generateAuthToken();
        //                     clientCheck.lastLoginDate = Date.now();
        //                     await clientCheck.save();
        //                     res.status(200).json({
        //                         status: "success",
        //                         userStatus: "SUCCESS",
        //                         sso: false,
        //                         userType: "client",
        //                         message: "User Logged in Successfully",
        //                         emailVerified: clientCheck.isClientEmailVerify,
        //                         token: token,
        //                     });
        //                 } else {
        //                     sendOtpVerificationEmail({
        //                         _id: clientCheck._id,
        //                         email: clientCheck.clientEmail,
        //                         userType: "client",
        //                         verificationType: "email",
        //                         verificationFor: "signin verification",
        //                         type: "client"
        //                     }, res);
        //                 }
        //             } else {
        //                 res.status(400).json({
        //                     status: "fail",
        //                     userStatus: "FAIL",
        //                     sso: false,
        //                     userType: "client",
        //                     message: "The email or password is wrong.",
        //                     emailVerified: clientCheck.isClientEmailVerify,
        //                     token: null
        //                 });
        //             }
        //         } else {
        //             res.status(400).json({
        //                 status: "fail",
        //                 userStatus: "FAIL",
        //                 sso: true,
        //                 userType: "client",
        //                 message: "The email or password is wrong.",
        //                 emailVerified: clientCheck.isClientEmailVerify,
        //                 token: null
        //             });
        //         }
        //     } else {
        //         console.log("client>professional");
        //         let professionalCheck = await ProfessionalsData.findOne({ professionalEmail: email });
        //         let isPass = professionalCheck.professionalPassword;

        //         if (isPass || isPass.length > 0) {
        //             let verify = await bcrypt.compare(pass, professionalCheck.professionalPassword);
        //             if (verify) {
        //                 // Check email verification and 2FA
        //                 if (professionalCheck.isprofessionalEmailVerify === true && professionalCheck.isTwoFactAuth === false) {
        //                     let token = await professionalCheck.generateAuthToken();
        //                     professionalCheck.lastLoginDate = Date.now();
        //                     await professionalCheck.save();
        //                     res.status(200).json({
        //                         status: "success",
        //                         userStatus: "SUCCESS",
        //                         sso: false,
        //                         userType: "professional",
        //                         message: "User Logged in Successfully",
        //                         emailVerified: professionalCheck.isprofessionalEmailVerify,
        //                         token: token,
        //                     });
        //                 } else {
        //                     sendOtpVerificationEmail({
        //                         _id: professionalCheck._id,
        //                         email: professionalCheck.professionalEmail,
        //                         userType: "professional",
        //                         verificationType: "email",
        //                         verificationFor: "signin verification",
        //                         type: "professional"
        //                     }, res);
        //                 }
        //             } else {
        //                 res.status(400).json({
        //                     status: "fail",
        //                     userStatus: "FAIL",
        //                     sso: false,
        //                     userType: "professional",
        //                     message: "The email or password is wrong.",
        //                     emailVerified: professionalCheck.isprofessionalEmailVerify,
        //                     token: null
        //                 });
        //             }
        //         } else {
        //             res.status(400).json({
        //                 status: "fail",
        //                 userStatus: "FAIL",
        //                 sso: true,
        //                 userType: "professional",
        //                 message: "The email or password is wrong.",
        //                 emailVerified: professionalCheck.isprofessionalEmailVerify,
        //                 token: null
        //             });
        //         }
        //     }
        // } else {
        //     console.log("Professional");
        //     let professionalCheck = await ProfessionalsData.findOne({ professionalEmail: email });

        //     if (professionalCheck !== null && userType === "professional") {
        //         console.log("Professional confirmed");
        //         let checkAccountType = professionalCheck.registerAs;
        //         console.log("Account Type", checkAccountType);

        //         if (checkAccountType === "professional") {
        //             console.log("professional>professional");
        //             let isPass = professionalCheck.professionalPassword;

        //             if (isPass || isPass.length > 0) {
        //                 let verify = await bcrypt.compare(pass, professionalCheck.professionalPassword);
        //                 if (verify) {
        //                     // Check email verification and 2FA
        //                     if (professionalCheck.isprofessionalEmailVerify === true && professionalCheck.isTwoFactAuth === false) {
        //                         let token = await professionalCheck.generateAuthToken();
        //                         professionalCheck.lastLoginDate = Date.now();
        //                         await professionalCheck.save();
        //                         res.status(200).json({
        //                             status: "success",
        //                             userStatus: "SUCCESS",
        //                             sso: false,
        //                             userType: "professional",
        //                             message: "User Logged in Successfully",
        //                             emailVerified: professionalCheck.isprofessionalEmailVerify,
        //                             token: token,
        //                         });
        //                     } else {
        //                         sendOtpVerificationEmail({
        //                             _id: professionalCheck._id,
        //                             userType: "professional",
        //                             email: professionalCheck.professionalEmail,
        //                             verificationType: "email",
        //                             verificationFor: "signin verification",
        //                             type: "professional"
        //                         }, res);
        //                     }
        //                 } else {
        //                     res.status(400).json({
        //                         status: "fail",
        //                         userStatus: "FAIL",
        //                         sso: false,
        //                         userType: "professional",
        //                         message: "The email or password is wrong.",
        //                         emailVerified: professionalCheck.isprofessionalEmailVerify,
        //                         token: null
        //                     });
        //                 }
        //             } else {
        //                 res.status(400).json({
        //                     status: "fail",
        //                     userStatus: "FAIL",
        //                     sso: true,
        //                     userType: "professional",
        //                     message: "The email or password is wrong.",
        //                     emailVerified: professionalCheck.isprofessionalEmailVerify,
        //                     token: null
        //                 });
        //             }
        //         } else {
        //             console.log("Professional>Client");
        //             let clientCheck = await ClientsData.findOne({ clientEmail: email });
        //             let isPass = clientCheck.clientPassword;

        //             if (isPass || isPass.length > 0) {
        //                 let verify = await bcrypt.compare(pass, clientCheck.clientPassword);
        //                 if (verify) {
        //                     // Check email verification and 2FA
        //                     if (clientCheck.isClientEmailVerify === true && clientCheck.isTwoFactAuth === false) {
        //                         let token = await clientCheck.generateAuthToken();
        //                         clientCheck.lastLoginDate = Date.now();
        //                         await clientCheck.save();
        //                         res.status(200).json({
        //                             status: "success",
        //                             userStatus: "SUCCESS",
        //                             sso: false,
        //                             userType: "client",
        //                             message: "User Logged in Successfully",
        //                             emailVerified: clientCheck.isClientEmailVerify,
        //                             token: token,
        //                         });
        //                     } else {
        //                         sendOtpVerificationEmail({
        //                             _id: clientCheck._id,
        //                             email: clientCheck.clientEmail,
        //                             userType: "client",
        //                             verificationType: "email",
        //                             verificationFor: "signin verification",
        //                             type: "client"
        //                         }, res);
        //                     }
        //                 } else {
        //                     res.status(400).json({
        //                         status: "fail",
        //                         userStatus: "FAIL",
        //                         sso: false,
        //                         userType: "client",
        //                         message: "The email or password is wrong.",
        //                         emailVerified: clientCheck.isClientEmailVerify,
        //                         token: null
        //                     });
        //                 }
        //             } else {
        //                 res.status(400).json({
        //                     status: "fail",
        //                     userStatus: "FAIL",
        //                     sso: true,
        //                     userType: "client",
        //                     message: "The email or password is wrong.",
        //                     emailVerified: clientCheck.isClientEmailVerify,
        //                     token: null
        //                 });
        //             }
        //         }
        //     } else {
        //         res.status(400).json({
        //             status: "fail",
        //             userStatus: "FAIL",
        //             sso: true,
        //             userType: null,
        //             message: "No Account Found",
        //             emailVerified: false,
        //             token: null
        //         });
        //     }
        // }
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
