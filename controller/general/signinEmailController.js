let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");
let bcrypt = require("bcryptjs");

async function signinEmailController(req, res) {
    try {
        let email = req.body.email;
        let pass = req.body.pass;

        let clientsData = await ClientsData.findOne({clientEmail : email});
        let professionalData = await ProfessionalsData.findOne({professionalEmail : email});

        if(clientsData !== null && professionalData === null){  //Check if it's clients account
            console.log("Client no professional");
            if (clientsData.clientPassword || clientsData.clientPassword !== null) { //Check if password is present in the account
                            let verify = await bcrypt.compare(pass, clientsData.clientPassword);
                            console.log("Client PAssword passed");

                            if(verify || verify === true){ //Check if the password send is same
                                if(clientsData.isTwoFactAuth || clientsData.isTwoFactAuth === true){
                                    console.log("Client OTP Enabled");
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
                                    console.log("Client OTP Disabled");
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
            console.log("No client , professional");
            if (professionalData.professionalPassword || professionalData.professionalPassword !== null) { //Check if password is present in the account
                let verify = await bcrypt.compare(pass, professionalData.professionalPassword);
                console.log("Professional without passsword");

                if(verify || verify === true){ //Check if the password send is same
                    if(professionalData.isTwoFactAuth || professionalData.isTwoFactAuth === true){
                        console.log("Only professional OTP Enaabled");
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
                        console.log("Only professional OTP Disabled");
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
