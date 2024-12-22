let sendOtpVerificationPhone = require("../../middleware/sendOtpVerificationPhone");
const ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const { parsePhoneNumber } = require('libphonenumber-js');
const countries = require('i18n-iso-countries');

async function sendPhoneOtpController(req, res){
    try{
        // let {userId,userEmail, type} = req.body;
        let userType = req.body.userType;
        let userId = req.body.userId;
        let phoneNo = req.body.phoneNo;

        if(userType  === "client"){
            let data = await ClientsData.findOne({clientPhoneNo : phoneNo}).select({clientPhoneNo : 1, clientCountry : 1});
            if(data !== null &&  data?._id != userId){
                throw new Error("This Phone No is already in use.")
            }
            else{
                const phoneDetails = parsePhoneNumber(phoneNo);
                if (phoneDetails && phoneDetails.country) {
                    const isoCountryCode = phoneDetails.country; // ISO country code (e.g., 'US', 'GB')
                    
                    // Map ISO code to full country name
                    const countryName = countries.getName(isoCountryCode, 'en'); // 'en' for English names
        
                    if (countryName) {
                        await ClientsData.findOneAndUpdate({ _id: userId }, { clientPhoneNo: phoneNo, clientCountry : countryName }, { new: true });
                        sendOtpVerificationPhone(userId, phoneNo, res);
                    } else {
                        throw new Error(`Country name not found for ISO code: ${isoCountryCode}`);
                    }
                } else {
                    throw new Error('Invalid phone number or country code not detected');
                }
                
            }
        } 
        else{ 
            let data = await ProfessionalsData.findOne({professionalPhoneNo : phoneNo}).select({professionalPhoneNo : 1, professionalCountry : 1});
            if(data !== null &&  data?._id != userId){
                throw new Error("This Phone No is already in use.")
            }
            else{
                const phoneDetails = parsePhoneNumber(phoneNo);
                if (phoneDetails && phoneDetails.country) {
                    const isoCountryCode = phoneDetails.country; // ISO country code (e.g., 'US', 'GB')
                    
                    // Map ISO code to full country name
                    const countryName = countries.getName(isoCountryCode, 'en'); // 'en' for English names
        
                    if (countryName) {
                        await ProfessionalsData.findOneAndUpdate({ _id: userId }, { professionalPhoneNo: phoneNo, professionalCountry :countryName  }, { new: true });
                        sendOtpVerificationPhone(userId, phoneNo, res);
                    } else {
                        throw new Error(`Country name not found for ISO code: ${isoCountryCode}`);
                    }
                } else {
                    throw new Error('Invalid phone number or country code not detected');
                }
            }
        }
        
    }
    catch(e){
        console.log("Error while Fetching Email Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = sendPhoneOtpController;