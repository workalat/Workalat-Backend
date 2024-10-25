let ClientsData= require ("../../models/Client");
let ProfessionalsData= require ("../../models/Professional");
let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");

async function signupEmailController(req, res){
    try{        
        let clientId = req.body.clientId;
        let email = req.body.email;
        let name = req.body.name;
        let pass = req.body.pass;
        let confirmPass = req.body.confirmPass;
        let userType = req.body.userType; 
        let professionalService = req.body.professionalService;
         console.log(req.body);

        if(userType === "client"){ //client signup with email 
            console.log("client")
        let data = await ClientsData.find({clientEmail : email});
        if(data.length>0){
            throw new Error("This email already exists, Please use another email.");
        }
        else{
            if(pass !==confirmPass){
                throw new Error("Password and Confirm Password are not same");
            }
            else{
                let data = await ClientsData.findOne({_id : clientId});
                console.log(data);
                data.clientEmail = email;
                data.clientPassword = pass;
                data.clientFullName = name;
                data.registerAs = "client";
                await data.save();
                console.log(data);
                if(data.isClientEmailVerify === true || data.isClientEmailVerify){
                    //If email is already verified then sneding all the required data
                    res.cookie("token", token, {
                    sameSite: "none",
                    secure: true,
                    }).status(200).json({status: "success", message : "Email and password has been saved successfully",id: data._id ,data: [{
                        userId : data._id,
                        isClientPhoneNoVerify : data.isClientPhoneNoVerify,
                        isClientEmailVerify : data.isClientEmailVerify,
                        clientDashAccess : data.clientDashAccess,
                        clientPostingAccess : data.clientPostingAccess,
                        adminAccessClient: data.adminAccessClient
                    }]})
                }
                else{
                    //Email verification process
                    // console.log("Before verification :" ,data._id, data.clientEmail)
                    sendOtpVerificationEmail({_id: data._id, email: data.clientEmail, userType : "client" ,verificationType: "email" ,verificationFor : "signup verification", type:"client"}, res);
                    
                }
            }
        }
        }
        else{
            let data = await ProfessionalsData.find({professionalEmail : email});
        if(data.length>0){
            throw new Error("This email already exists.");
        }
        else{
            if(pass !==confirmPass){
                throw new Error("Password and Confirm Password are not same");
                res.status(400).json({status : "fail", message : "Password and Confirm Password are not same"});
            }
            else{ //signup user with email
                console.log("professionalService");
                let dates ={
                    passwordLast: Date.now(),
                    twoFactAuthLast : Date.now(),
                    kycLast: Date.now(),
                    phoneLast: Date.now()
                };
                let data = await ProfessionalsData.create({
                    professionalEmail :email, 
                    professionalFullName : name,
                    professionalPassword : pass,
                    professionalRegisterationType : "email",
                    registerAs : "professional",
                    professionalPrimaryService : professionalService,
                    ChangingDates: dates
                })

                if(data.isClientEmailVerify === true || data.isClientEmailVerify){
                    //If email is already verified then sneding all the required data
                    res.status(200).json({status: "success", message : "Email and password has been saved successfully", id: data._id ,data: [{
                        userId : data._id,
                        clientDashAccess : data.clientDashAccess,
                        professionalDashAccess : data.professionalDashAccess,
                        clientDashAccess : data.clientDashAccess,
                        adminAccessProfessional: data.adminAccessProfessional,
                        isprofessionalEmailVerify : data.isprofessionalEmailVerify,
                        isprofessionalBidAccess: data.isprofessionalBidAccess,

                    }]})
                }
                else{
                    //Email verification process
                    sendOtpVerificationEmail({_id: data._id, email: data.professionalEmail, userType : "professional"  ,verificationType: "email" ,verificationFor : "signup verification",type:"professional", accountCreation : true}, res);
                    
                }
            }
        }

        }
        
    }
    catch(e){
        console.log("Error while creating account using phone number during project posting", e);
        res.status(400).json({status : "fail", message : e.message});
    }
};


module.exports  = signupEmailController;