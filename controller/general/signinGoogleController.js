let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function signinGoogleController(req, res) {
    try {
      
        let userFullName = req.body.userFullName;
        let email = req.body.email;
        let userPictureLink = req.body.userPictureLink;
        let userType = req.body.userType;

        console.log(req.body);


        let clientsData = await ClientsData.findOne({clientEmail : email});
        let professionalData = await ProfessionalsData.findOne({professionalEmail : email});

        if(clientsData !== null && professionalData === null){  //Check if it's clients account
                                if(clientsData.clientRegisterationType === "google"){
                                    let token = await clientsData.generateAuthToken();
                                    clientsData.lastLoginDate = Date.now();
                                    await clientsData.save();
                                    res.status(200).json({
                                        status: "success",
                                        userStatus: "SUCCESS",
                                        userType: "client",
                                        message: "User Logged in Successfully",
                                        token: token,
                                    });

                                }
                                else{
                                    throw new Error("Please use Another Email.")
                                }
        }
        else if(clientsData === null && professionalData !== null){ //Check if it's Professional account
                    
                    if(professionalData.professionalRegisterationType === "google"){
                        let token = await professionalData.generateAuthToken();
                        professionalData.lastLoginDate = Date.now();
                        await professionalData.save();
                        res.status(200).json({
                            status: "success",
                            userStatus: "SUCCESS",
                            userType: "professional",
                            message: "User Logged in Successfully",
                            token: token,
                        });
                    }
                    else{
                        throw new Error("Please use Another Email.")
                    }
        }
        else if(clientsData !== null && professionalData !== null){
                console.log("Both client and professional");
                if(clientsData.registerAs === "client"){
                    console.log("Register as client");
                    
                        if(clientsData.clientRegisterationType === "google"){
                            let token = await clientsData.generateAuthToken();
                            clientsData.lastLoginDate = Date.now();
                            await clientsData.save();
                            res.status(200).json({
                                status: "success",
                                userStatus: "SUCCESS",
                                userType: "client",
                                message: "User Logged in Successfully",
                                token: token,
                            });
                        }
                        else{
                            throw new Error("Please use Another Email.")
                        }
                }
                else{
                    console.log("Register as PRofessional");
                        if(professionalData.professionalRegisterationType === "google"){
                            let token = await professionalData.generateAuthToken();
                            professionalData.lastLoginDate = Date.now();
                            await professionalData.save();
                            res.status(200).json({
                                status: "success",
                                userStatus: "SUCCESS",
                                userType: "professional",
                                message: "User Logged in Successfully",
                                token: token,
                            });
                        }
                        else{
                            throw new Error("Please use Another Email.")
                        }
                }
        }
        else{
            if(userType === "client"){
                
            let dates ={
                passwordLast: Date.now(),
                twoFactAuthLast : Date.now(),
                kycLast: Date.now(),
                phoneLast: Date.now()
            };
            let clientDataCreation = await ClientsData.create({
                clientFullName: userFullName,
                clientEmail: email,
                isClientEmailVerify: true,
                clientPictureLink: userPictureLink,
                isClientPicture: true,
                clientRegisterationType: "google",
                registerAs: "client",
                ChangingDates : dates
            });
            let token = await clientDataCreation.generateAuthToken();
            res.status(200).json({ status: "success", userStatus: "SUCCESS",  userType: "client", message: "Account creation Successfull.", token: token,})
            }
            else{
                
            let dates ={
                passwordLast: Date.now(),
                twoFactAuthLast : Date.now(),
                kycLast: Date.now(),
                phoneLast: Date.now()
            };
            let professionalDataCreation = await ProfessionalsData.create({
                professionalFullName: userFullName,
                professionalEmail: email,
                isprofessionalEmailVerify: true,
                professionalPictureLink: userPictureLink,
                isprofessionalPicture: true,
                professionalRegisterationType: "google",
                registerAs: "professional",
                ChangingDates : dates
            });
            let token = await professionalDataCreation.generateAuthToken();
            res.status(200).json({ status: "success", userStatus: "SUCCESS",  userType: "professional", message: "Account creation Successfull.", token: token,})

            }
        }
    }
    catch (e) {
        console.log("Error in signing in client with email", e);
        res.status(400).json({ status: "fail", userStatus: "FAILED", message: e.message });
    }
};

module.exports = signinGoogleController;