let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
let sendOtpVerificationEmail = require("../../middleware/sendOTPVerificationEmail");

async function forgetPasswordEmailSendController(req, res){
    try{
        let userEmail = req.body.userEmail;
        // let userType = req.body.userType;
        console.log(req.body);

        
        let clientsData = await ClientsData.findOne({clientEmail : userEmail});
        let professionalData = await ProfessionalsData.findOne({professionalEmail : userEmail});

        if(clientsData !== null && professionalData === null){  //Check if it's clients account
            sendOtpVerificationEmail({_id: clientsData._id, email: userEmail,verificationType: "email" , userType: "client" ,verificationFor : "forgot", type:"client"}, res);
        }
        else if(clientsData === null && professionalData !== null){  //Check if it's Professional account
            sendOtpVerificationEmail({_id: professionalData._id, email: userEmail,verificationType: "email" , userType: "professional" ,verificationFor : "forgot", type:"professional"}, res);
        }
        else if(clientsData !== null && professionalData !== null){  //Check if it's Both account
            if(clientsData.registerAs === "client"){
                sendOtpVerificationEmail({_id: clientsData._id, email: userEmail,verificationType: "email" , userType: "client" ,verificationFor : "forgot", type:"client"}, res);
            }
            else{
                sendOtpVerificationEmail({_id: professionalData._id, email: userEmail,verificationType: "email" , userType: "professional" ,verificationFor : "forgot", type:"professional"}, res);
            }
        }
        else{
            throw new Error("No Account with this email Found.");
        }

        // console.log(req.body);
        // if(userType === "client"){ 

        //     let clientCheck = await ClientsData.findOne({clientEmail : userEmail});
        //     if(clientCheck !== null){
        //         if(clientCheck.registerAs === "client"){
        //             sendOtpVerificationEmail({_id: clientCheck._id, email: userEmail,verificationType: "email" , userType: "client" ,verificationFor : "forgot", type:"client"}, res);
        //         }
        //         else{
        //             let professionalCheck = await ProfessionalsData.findOne({professionalEmail : userEmail});
        //             if(professionalCheck !== null){
        //                 sendOtpVerificationEmail({_id: professionalCheck._id, email: userEmail,verificationType: "email" , userType: "professional" ,verificationFor : "forgot", type:"professional"}, res);
        //             }
        //             else{
        //                 throw new Error("No Account with this email Found.");
        //             }
        //         }
        //     }
        //     else{
        //         throw new Error("No Account with this email Found.");
        //     }

        // }
        // else{ 
        // let professionalCheck = await  ProfessionalsData.findOne({professionalEmail : userEmail});
        // if(professionalCheck !== null){
        //     if(professionalCheck.registerAs === "professional"){
        //         sendOtpVerificationEmail({_id: professionalCheck._id, email: userEmail,verificationType: "email" , userType: "professional" ,verificationFor : "forgot", type:"professional"}, res);
        //     }
        //     else{
        //         let clientCheck = await ClientsData.findOne({clientEmail : userEmail});
        //         if(clientCheck !== null){
        //             sendOtpVerificationEmail({_id: clientCheck._id, email: userEmail,verificationType: "email" , userType: "client" ,verificationFor : "forgot", type:"client"}, res);
        //         }
        //         else{
        //             throw new Error("No Account with this email Found.");
        //         }
        //     }
        // }
        // else{
        //     throw new Error("No Account with this email Found.");
        // }
        // }
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = forgetPasswordEmailSendController;