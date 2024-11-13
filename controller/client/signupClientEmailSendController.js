
let ClientsData = require("../../models/Client");
let sendOTPVerificationEmailWithoutId = require("../../middleware/sendOTPVerificationEmailWithoutId");


async function signupClientEmailSendController(req, res){
    try{        
        let email = req.body.email;
        // let country = req.body.country; 
        // let countryCode = req.body.countryCode;

        if((email ===null || email === undefined)){
            throw new Error("Please enter valide details.")
        } 
        else{
            let data = await ClientsData.find({clientEmail : email}); //If the phone no is already present we will not create the account.
            if(data.length>0){
                throw new Error("This Email is already registered, please use another Email.");
            }
            else{
                // let dates ={
                //     passwordLast: Date.now(),
                //     twoFactAuthLast : Date.now(),
                //     kycLast: Date.now(),
                //     phoneLast: Date.now()
 
                // }
                // let data = await ClientsData.create({clientPhoneNo : phoneNo, registerAs :"client",clientCountry : country, clientCountryCode : countryCode, clientRegisterationType : "phone", ChangingDates: dates});
                // if(data.isClientPhoneNoVerify === true || data.isClientPhoneNoVerify){
                //     res.status(200).json({status : "success", message : "Account has been created successfully", data:[{
                //         userId : data._id, 
                //         isClientPhoneNoVerify : data.isClientPhoneNoVerify,
                //         isClientEmailVerify : data.isClientEmailVerify,
                //         clientDashAccess : data.clientDashAccess,
                //         clientPostingAccess : data.clientPostingAccess,
                //         adminAccessClient: data.adminAccessClient,
                //     }]})
                // } 
                // else{
                    //Phone no verification process
                    sendOTPVerificationEmailWithoutId({ email: email, userType : "client" ,verificationType: "email" ,verificationFor : "signup verification", type:"client"}, res);
                    // res.status(200).json({status : "success", message : "Account has been created successfully", data : [{
                    //     userId : data._id,
                    //     isClientPhoneNoVerify : data.isClientPhoneNoVerify,
                    //     isClientEmailVerify : data.isClientEmailVerify,
                    // }]})
                // }
            }  
        }
       
    }
    catch(e){
        console.log("Error while creating account using sending email otp to client without ID.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
}


module.exports = signupClientEmailSendController;