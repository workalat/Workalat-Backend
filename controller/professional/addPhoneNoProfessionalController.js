let ProfessionalsData = require("../../models/Professional");
let sendOtpVerificationPhone = require("../../middleware/sendOtpVerificationPhone");
async function addPhoneNoProfessionalController(req, res){
    try{
        let userId = req.body.userId;
        let phoneNo = req.body.phoneNo;
        let country = req.body.country;
        let countryCode = req.body.countryCode;

        if((phoneNo ===null || phoneNo === undefined) || (country ===null || country === undefined) || (countryCode ===null || countryCode === undefined)){
            res.status(400).json({status : "fail", message : "Please enter valide details, There must be an Error in your given details"});
        }
        else{
            let data = await ProfessionalsData.find({professionalPhoneNo : phoneNo}); //If the phone no is already present we will not create the account.
            console.log(data);
            if(data.length>0){
                res.status(400).json({status : "fail", message : "This Phone Number is already registered, please use another Phone Number", data : []});
                console.log(data);
            }
            else{
                let professionalData = await ProfessionalsData.findOne({_id :  userId});
                // let dates ={
                //     passwordLast: Date.now(),
                //     twoFactAuthLast : Date.now(),
                //     kycLast: Date.now(),
                //     phoneLast: Date.now()
                // };
                professionalData.professionalPhoneNo = phoneNo;
                professionalData.clientCountry = country;
                professionalData.clientCountryCode = countryCode;
                professionalData.ChangingDates[0].phoneLast = Date.now();
                await professionalData.save();

                if(data.isClientPhoneNoVerify === true || data.isClientPhoneNoVerify){
                    professionalData.generateAuthToken();
                    res.status(200).json({status : "success", message : "Account has been created successfully", token : token ,data:[{
                        userId : data._id,
                        isprofessionalPhoneNoVerify : professionalData.isprofessionalPhoneNoVerify,
                        isprofessionalEmailVerify : professionalData.isprofessionalEmailVerify,
                        adminAccessProfessional: professionalData.adminAccessProfessional
                    }]})
                }
                else{
                    //Phone no verification process
                    let phone = countryCode+phoneNo;
                    // console.log(phone);
                    sendOtpVerificationPhone(professionalData._id, phone, res)
                }
            }

        }

       

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addPhoneNoProfessionalController;