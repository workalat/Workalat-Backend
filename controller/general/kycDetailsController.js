let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function kycDetailsController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName; 
        let email = req.body.email;
        let phoneNo = req.body.phoneNo;
        let postcode = req.body.postcode;
        // let companyNumber = req.body.companyNumber; //number/string
        let address = req.body.address;
        // console.log(req.body);
        if(userType ==="client" ){
            let data = await ClientsData.findOne({_id : userId});
            if(data === null){
                res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "Invalid Credentials, please login again"}); 
            }
            else{
                let kyc = {
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    phoneNo : phoneNo,
                    postcode : postcode,
                    address : address,
                    clientCompanyAddress : address,
                    timeStamp : Date.now()
                }
                data.kycStatus = "pending";
                data.kyc = kyc;
                data.ChangingDates[0].kycLast = Date.now();
                await data.save();
                console.log(data)
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : `KYC Added Successfully`});
            }
        }
        else{
            let data = await ProfessionalsData.findOne({_id : userId});
            if(data === null){
                res.status(400).json({status : "fail", userStatus : "FAILED" ,message : "Invalid Credentials, please login again"}); 
            }
            else{
                
                let kyc = {
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    phoneNo : phoneNo,
                    postcode : postcode,
                    // companyNumber : companyNumber,
                    address : address,
                    clientCompanyAddress : address,
                    timeStamp : Date.now()
                }
                data.kycStatus = "pending";
                data.kyc = kyc;
                data.ChangingDates[0].kycLast = Date.now();
                await data.save();
                res.status(200).json({status : "success", userStatus : "SUCCESS", message : `KYC Added Successfully`});
            }

        }
    }
    catch(e){
        console.log("Error while Adding KYC Details. ", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = kycDetailsController;