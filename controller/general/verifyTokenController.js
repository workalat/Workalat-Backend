let verification = require("../../middleware/verification");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function verifyTokenController(req, res) {
  let token = req.body.token;
  // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA1MWUyY2QyMDQyN2E0Y2EwMWMyMGUiLCJyZWdpc3RlckFzIjoicHJvZmVzc2lvbmFsIiwiaWF0IjoxNzI4NDc0MzQ3fQ.j-Npp4350Ib2_cTg1sNotEqNhD1xyTkV6gDcKTVS7xkasd";
  let type = req.body.type;
  let auth = req.body.auth || false;
  try {
    if(auth === false || !auth){
        let verify = await verification({ token: token });

        if (verify.verified === true || verify.verified) {
            let checkRegister = verify.userType;
            if (checkRegister === "client") {
                if (type === "client") {
                    // console.log("client > client");
                    let d = await ClientsData.findOne({ _id: verify._id }).select({
                        clientFName: 1,
                        clientFullName: 1,
                        isTwoFactAuth: 1,
                        clientEmail: 1,
                        isClientEmailVerify: 1,
                        isClientPhoneNoVerify: 1,
                        clientPictureLink: 1,
                        clientRegisterationType: 1,
                        registerAs: 1,
                        completeProfileRegistration: 1,
                        clientCountry : 1,
                        clientRegisterationType : 1,

                    });
                    if (d === null) {
                        throw Error("No Data Found, please login again.");
                    }
                    else {
                        let data = [{
                            fName: d.clientFName,
                            fullName: d.clientFullName,
                            isTwoFactAuth: d.isTwoFactAuth,
                            email: d.clientEmail,
                            isEmailVerify: d.isClientEmailVerify,
                            isPhoneVerify: d.isClientPhoneNoVerify,
                            pictureLink: d.clientPictureLink,
                            registrationType: d.clientRegisterationType,
                            registerAs: d.registerAs,
                            isRegsitrationComplete: d.completeProfileRegistration,
                            country : d.clientCountry,
                            totalBidPoints : null,
                            registrationType : d.clientRegisterationType 
                        }]
                        res.status(200).json({ status: "success", userStatus: "SUCCESS",userType : "client" ,msg: "User is verified", verified: true, userId: verify._id, data: data });

                    }
                }
                else {
                    
                    // console.log("client > professional");
                    let d = await ProfessionalsData.findOne({ _id: verify._id }).select({
                        professionalFName: 1,
                        professionalFullName: 1,
                        isTwoFactAuth: 1,
                        professionalEmail: 1,
                        isprofessionalEmailVerify: 1,
                        isprofessionalPhoneNoVerify: 1,
                        professionalPictureLink: 1,
                        professionalRegisterationType: 1,
                        registerAs: 1,
                        completeProfileRegistration: 1,
                        professionalCountry  : 1,
                        professionalTotalBidPoints : 1,
                        membershipStatus : 1,
                        professionalRegisterationType : 1
                    });
                    if (d === null) {
                        throw Error("No Data Found, please login again.");
                    }
                    else {

                        let data = [{
                            fName: d.professionalFName,
                            fullName: d.professionalFullName,
                            isTwoFactAuth: d.isTwoFactAuth,
                            email: d.professionalEmail,
                            isEmailVerify: d.isprofessionalEmailVerify,
                            isPhoneVerify: d.isprofessionalPhoneNoVerify,
                            pictureLink: d.professionalPictureLink,
                            registrationType: d.professionalRegisterationType,
                            registerAs: d.registerAs,
                            isRegsitrationComplete: d.completeProfileRegistration,
                            country : d.professionalCountry,
                            totalBidPoints : d.professionalTotalBidPoints,
                            membershipStatus : d.membershipStatus,
                            registrationType : d.professionalRegisterationType
                        }]
                        res.status(200).json({ status: "success", userStatus: "SUCCESS",userType : "professional" ,msg: "User is verified", verified: true, userId: verify._id, data: data });

                    }
                }
            }


            
            else {
                if (type === "client") {
                    let d = await ClientsData.findOne({ _id: verify._id }).select({
                        clientFName: 1,
                        clientFullName: 1,
                        isTwoFactAuth: 1,
                        clientEmail: 1,
                        isClientEmailVerify: 1,
                        isClientPhoneNoVerify: 1,
                        clientPictureLink: 1,
                        clientRegisterationType: 1,
                        registerAs: 1,
                        completeProfileRegistration: 1,
                        clientCountry : 1,
                        clientRegisterationType : 1,
                    });

                    if (d === null) {
                        throw Error("No Data Found, please login again.");
                    }
                    else {
                        let data = [{
                            fName: d.clientFName,
                            fullName: d.clientFullName,
                            isTwoFactAuth: d.isTwoFactAuth,
                            email: d.clientEmail,
                            isEmailVerify: d.isClientEmailVerify,
                            isPhoneVerify: d.isClientPhoneNoVerify,
                            pictureLink: d.clientPictureLink,
                            registrationType: d.clientRegisterationType,
                            registerAs: d.registerAs,
                            isRegsitrationComplete: d.completeProfileRegistration,
                            country : d.clientCountry,
                            totalBidPoints : null,
                            registrationType : d.clientRegisterationType 
                        }]
                        res.status(200).json({ status: "success", userStatus: "SUCCESS", userType : "client" ,msg: "User is verified", verified: true, userId: verify._id, data: data });

                    }
                }
                else {
                    let d = await ProfessionalsData.findOne({ _id: verify._id }).select({
                        professionalFName: 1,
                        professionalFullName: 1,
                        isTwoFactAuth: 1,
                        professionalEmail: 1,
                        isprofessionalEmailVerify: 1,
                        isprofessionalPhoneNoVerify: 1,
                        professionalPictureLink: 1,
                        professionalRegisterationType: 1,
                        registerAs: 1,
                        completeProfileRegistration: 1,
                        professionalCountry  : 1,
                        professionalTotalBidPoints : 1,
                        membershipStatus : 1,
                        professionalRegisterationType : 1
                    });
                    if (d === null) {
                        throw Error("No Data Found, please login again.");
                    }
                    else {

                        let data = [{
                            fName: d.professionalFName,
                            fullName: d.professionalFullName,
                            isTwoFactAuth: d.isTwoFactAuth,
                            email: d.professionalEmail,
                            isEmailVerify: d.isprofessionalEmailVerify,
                            isPhoneVerify: d.isprofessionalPhoneNoVerify,
                            pictureLink: d.professionalPictureLink,
                            registrationType: d.professionalRegisterationType,
                            registerAs: d.registerAs,
                            isRegsitrationComplete: d.completeProfileRegistration,
                            country : d.professionalCountry,
                            totalBidPoints : d.professionalTotalBidPoints,
                            membershipStatus : d.membershipStatus,
                            registrationType : d.professionalRegisterationType
                        }]
                        res.status(200).json({ status: "success", userStatus: "SUCCESS", userType : "professional" ,msg: "User is verified", verified: true, userId: verify._id, data: data });

                    }
                }
            }
        }
        else {
            res.status(400).json({ status: "fail", userStatus: "FAILED", msg: "Your login Token has been expired or invalid, please login first", verified: false })
        }
    }
    else{
        let verify = await verification({ token: token });

    if (verify.verified === true || verify.verified) {
      if (type === "client") {
        let checkRegister = verify.userType;
        if (checkRegister === "client") {
          // console.log("client > client");
          let d = await ClientsData.findOne({ _id: verify._id }).select({
            clientFName: 1,
            clientFullName: 1,
            isTwoFactAuth: 1,
            clientEmail: 1,
            isClientEmailVerify: 1,
            isClientPhoneNoVerify: 1,
            clientPictureLink: 1,
            clientRegisterationType: 1,
            registerAs: 1,
            completeProfileRegistration: 1,
            clientCountry: 1,
            clientRegisterationType : 1,
          });

          if (d === null) {
            throw Error("No Data Found, please login again.");
          } else {
            let data = [
              {
                fName: d.clientFName,
                fullName: d.clientFullName,
                isTwoFactAuth: d.isTwoFactAuth,
                email: d.clientEmail,
                isEmailVerify: d.isClientEmailVerify,
                isPhoneVerify: d.isClientPhoneNoVerify,
                pictureLink: d.clientPictureLink,
                registrationType: d.clientRegisterationType,
                registerAs: d.registerAs,
                isRegsitrationComplete: d.completeProfileRegistration,
                country: d.clientCountry,
                totalBidPoints : null,
                registrationType : d.clientRegisterationType 
              },
            ];
            res
              .status(200)
              .json({
                status: "success",
                userStatus: "SUCCESS",
                userType: "client",
                msg: "User is verified",
                verified: true,
                userId: verify._id,
                data: data,
              });
          }
        } else {
          // console.log("client > professional");
          let d = await ProfessionalsData.findOne({ _id: verify._id }).select({
            professionalFName: 1,
            professionalFullName: 1,
            isTwoFactAuth: 1,
            professionalEmail: 1,
            isprofessionalEmailVerify: 1,
            isprofessionalPhoneNoVerify: 1,
            professionalPictureLink: 1,
            professionalRegisterationType: 1,
            registerAs: 1,
            completeProfileRegistration: 1,
            professionalCountry: 1,
            professionalTotalBidPoints : 1,
            membershipStatus : 1,
            professionalRegisterationType : 1
          });
          if (d === null) {
            throw Error("No Data Found, please login again.");
          } else {
            let data = [
              {
                fName: d.professionalFName,
                fullName: d.professionalFullName,
                isTwoFactAuth: d.isTwoFactAuth,
                email: d.professionalEmail,
                isEmailVerify: d.isprofessionalEmailVerify,
                isPhoneVerify: d.isprofessionalPhoneNoVerify,
                pictureLink: d.professionalPictureLink,
                registrationType: d.professionalRegisterationType,
                registerAs: d.registerAs,
                isRegsitrationComplete: d.completeProfileRegistration,
                country: d.professionalCountry,
                totalBidPoints : d.professionalTotalBidPoints,
                membershipStatus : d.membershipStatus,
                registrationType : d.professionalRegisterationType
              },
            ];
            res
              .status(200)
              .json({
                status: "success",
                userStatus: "SUCCESS",
                userType: "professional",
                msg: "User is verified",
                verified: true,
                userId: verify._id,
                data: data,
              });
          }
        }
      }
      else{
        let checkRegister = verify.userType;
      if (checkRegister === "client") {
          // console.log("professional>client");
          let d = await ClientsData.findOne({ _id: verify._id }).select({
            clientFName: 1,
            clientFullName: 1,
            isTwoFactAuth: 1,
            clientEmail: 1,
            isClientEmailVerify: 1,
            isClientPhoneNoVerify: 1,
            clientPictureLink: 1,
            clientRegisterationType: 1,
            registerAs: 1,
            completeProfileRegistration: 1,
            clientCountry: 1,
            clientRegisterationType : 1,
          });

          if (d === null) {
            throw Error("No Data Found, please login again.");
          } else {
            let data = [
              {
                fName: d.clientFName,
                fullName: d.clientFullName,
                isTwoFactAuth: d.isTwoFactAuth,
                email: d.clientEmail,
                isEmailVerify: d.isClientEmailVerify,
                isPhoneVerify: d.isClientPhoneNoVerify,
                pictureLink: d.clientPictureLink,
                registrationType: d.clientRegisterationType,
                registerAs: d.registerAs,
                isRegsitrationComplete: d.completeProfileRegistration,
                country: d.clientCountry,
                registrationType : d.clientRegisterationType 
              },
            ];
            res
              .status(200)
              .json({
                status: "success",
                userStatus: "SUCCESS",
                userType: "client",
                msg: "User is verified",
                verified: true,
                userId: verify._id,
                data: data,
              });
          }
        } else {
          let d = await ProfessionalsData.findOne({ _id: verify._id }).select({
            professionalFName: 1,
            professionalFullName: 1,
            isTwoFactAuth: 1,
            professionalEmail: 1,
            isprofessionalEmailVerify: 1,
            isprofessionalPhoneNoVerify: 1,
            professionalPictureLink: 1,
            professionalRegisterationType: 1,
            registerAs: 1,
            completeProfileRegistration: 1,
            professionalCountry: 1,
            professionalTotalBidPoints : 1,
            membershipStatus : 1,
            professionalRegisterationType : 1
          });
          if (d === null) {
            throw Error("No Data Found, please login again.");
          } else {
            let data = [
              {
                fName: d.professionalFName,
                fullName: d.professionalFullName,
                isTwoFactAuth: d.isTwoFactAuth,
                email: d.professionalEmail,
                isEmailVerify: d.isprofessionalEmailVerify,
                isPhoneVerify: d.isprofessionalPhoneNoVerify,
                pictureLink: d.professionalPictureLink,
                registrationType: d.professionalRegisterationType,
                registerAs: d.registerAs,
                isRegsitrationComplete: d.completeProfileRegistration,
                country: d.professionalCountry,
                totalBidPoints : d.professionalTotalBidPoints,
                membershipStatus : d.membershipStatus,
                registrationType : d.professionalRegisterationType
              },
            ];
            res
              .status(200)
              .json({
                status: "success",
                userStatus: "SUCCESS",
                userType: "professional",
                msg: "User is verified",
                verified: true,
                userId: verify._id,
                data: data,
              });
          }
        }

      } 
    }
    }
     } catch (e) {
    // console.log("Verification Error", e);
    console.log("Error while verifying Login Token.", e);
    res
      .status(400)
      .json({ status: "fail", userStatus: "FAILED", message: e.message });
  }
}

module.exports = verifyTokenController;
 