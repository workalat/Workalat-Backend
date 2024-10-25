let ProfessionalsData = require("../../models/Professional");

async function professionalSignupController(req, res){
    try{
        let email = req.body.email;
        let isEmailVerify = req.body.isEmailVerify;
        let fullName = req.body.fullName;
        let password = req.body.password;
        let phoneNo = req.body.phoneNo;
        let isPhoneVerify = req.body.isPhoneVerify;
        let phoneCountryCode = req.body.phoneCountryCode;
        let registrationType = req.body.registrationType; //google / linkedin / email
        let primaryService = req.body.primaryService;
        let pictureLink = req.body.pictureLink;
        let companyName = req.body.companyName;
        let companyWebsite = req.body.companyWebsite;
        let companySize = req.body.companySize;
        let bio = req.body.bio;
        let skills = req.body.skills;  //Array ["web development", "graphic designing"]
        let postCode = req.body.postCode;

        let s =  skills.map(str => str.toLowerCase());

        let [verifyEmail, verifyPhone] = await Promise.all([
            ProfessionalsData.countDocuments({professionalEmail : email}),
            ProfessionalsData.countDocuments({professionalPhoneNo : phoneNo}),
        ]);

        if(verifyEmail > 0){
            throw new Error("An account with this Email already exits, please use another email, or Login")
        }
        if(verifyPhone > 0){
            throw new Error("An account with this Phone No already exits, please use another Phone No.")
        }

        let dates ={
            passwordLast: Date.now(),
            twoFactAuthLast : Date.now(),
            kycLast: Date.now(),
            phoneLast: Date.now()
        };

        let p = (password.length>0 ? password : undefined )

        let professional = await ProfessionalsData.create({
            professionalFullName : fullName,
            professionalEmail : email,
            isprofessionalEmailVerify : isEmailVerify,
            professionalPassword : p,
            professionalPhoneNo :phoneNo ,
            isprofessionalPhoneNoVerify : isPhoneVerify,
            professionalPictureLink :   pictureLink,
            professionalRegisterationType : registrationType,
            registerAs : "professional",
            primaryService : primaryService,
            professionalCountryCode : phoneCountryCode,
            professionalCompanyName : companyName,
            professionalCompanywebsite : companyWebsite,
            professionalCompanySize : companySize,
            professionalBio : bio,
            professionalSkills : s,
            professionalServiceLocPostCodes : postCode,
            ChangingDates : dates
        });
        let token = await professional.generateAuthToken();
        res.status(200).json({status : "success", userStatus : "SUCCESS", userType : "professional", userId : professional._id ,message : "Data Saved Successfully", token: token,});

    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = professionalSignupController;