require("dotenv").config();
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

let ClientsDataSchema  = new mongoose.Schema({
   clientFName : {
        type : String,
        lowercase: true,
        default : "" 
   }, 
   clientLName : {
        type : String,
        lowercase: true,
        default : ""
   },
   clientFullName : {
        type : String,
        lowercase: true,
        default : ""
   },
   //Toggles
   isTwoFactAuth : {  //true / false
    type : Boolean,
    default : false
   },
   markAsAvailalbe : {
    type : Boolean,
    default : false
   },
   activeChat:{
    type : Boolean,
    default : true
   },
   myRequest : {
    type : Boolean,
    default : false
   },
   chatNotifications : {
    type : Boolean,
    default : false
   },
   reminderChats : {
    type : Boolean,
    default : false
   },


   clientEmail : {
    type : String,
    default : ""
    },
    isClientEmailVerify : {
        type : Boolean,
        default : false
    },
    clientPassword: {
        type : String,
        default : null
    },
    clientPhoneNo : {
        type : String,
        default : ""
    },
    isClientPhoneNoVerify : {
        type : Boolean,
        default : false
    },
    isClientPicture : {
        type : Boolean,
        default : false
    },
    clientPictureLink : {
        type : String,
        default : "https://www.w3schools.com/howto/img_avatar.png"
    },
    clientRegisterationType : {  //Email / Phone No / Google
        type : String,
        lowercase: true, 
    },
    registerAs : {  // Professional / Client
        type : String,
        lowercase: true,
    },
    professionalId : {
        type : String,
        default : ""
    },
    clientCountry : {
        type : String,
        lowercase: true,
        default : ""
    },
    clientCountryCode : {
        type : String,
        default : ""
    },
    clientAddress : {
        type : String,
        lowercase: true,
        default : ""
    },
    clientBio : {
        type : String,
        lowercase: true,
        default : ""
    },
    clientCompanyName : {
        type : String,
        lowercase: true,
        default : ""
    },
    clientCompanyPhoneNo : {
        type : Number,
        default : null
    },
    clientCompanywebsite : {
        type : String,
        default : ''
    },
    clientCompanyAddress : {
        type : String,
        lowercase: true,
        default : ""
    },
    clientDocumentType : {
        type : String,
        lowercase: true,
        default : ""
    },
    clientDocumentLink : {
        type : String,
        default : ""
    },
    clientPostingAccess :{
        type : Boolean,
        default : true
    },
    clientDashAccess : {
        type : Boolean,
        default : true
    },
    professionalDashAccess : {
        type : Boolean,
        default : false
    },
    adminAccessClient : {
        type : Boolean,
        default : true
    },
    completeProfileRegistration : {
        type : Boolean,
        default : false
    },
    totalAmountSpend : {
        type : Number,
        default : 0
    },
    totalAmountWallet : {
        type : Number,
        default : 0
    },
    totalProjectsCompleted : {
        type : Number,
        default : 0
    },
    requestReleaseProfessional : {
        type : Boolean,
        default : false
    },
    clientTotalSuccessProjects : {
        type : Number,
        default : 0
    },
    clientChatSettings : {  //active/unactive
        type : String,
        lowercase: true,
        default : "unactive"
    },
    clientReviewSettings : {  //active/unactive
        type : String,
        lowercase: true,
        default : "unactive"
    },
    clientFeatureUpdateSettings : {  //active/unactive
        type : String,
        lowercase: true,
        default : "unactive"
    },
    clientReminderChatProfSettings : {  //active/unactive
        type : String,
        lowercase: true,
        default : "unactive"
    },
    clientChatId : {
        type : String,
        default : ""
    },
    clientProjects : {
        type : Array,
        default : []
    },
    clientAwardedProjects : {
        type : Array,
        default : []
    }, 
    paymentHistory : {
        type : Array,
        default : []
    },
    isPaymentVerify : {
        type : Boolean,
        default : false
    },
    totalRatings : {
        type : Number,
        default : 0
    },
    totalReviews: {
        type : Number,
        default : 0
    },
    reviews : [{
        giverId : {type : String},
        projectId : {type : String},
        projectName : {type : String},
        giverName : {type : String},
        giverPictureLink : {type : String, default : ""},
        giverCountry : {type : String, default : ""},
        giverRating : {type : Number},
        giverReview : {type: String},
        revieTimeStamp : ({type: Date, default : Date.now()})
    }],
    
    accountCreationDate : {
        type : Date,
        default : Date.now()
    },
    ChangingDates : [{
        passwordLast : {type : Date, default : Date.now()}, 
        twoFactAuthLast : {type : Date, default : Date.now()},
        kycLast : {type : Date, default : Date.now()},
        phoneLast : {type : Date, default : Date.now()},
    }],
    lastLoginDate : {
        type : Date,
        default : Date.now()
    },
    kycStatus : {
        type : String,
        lowercase  : true,
        default : "notApplied" //notApplied / pending / approved / rejected
    },
    kyc : [{
        firstName : {type : String,lowercase : true},
        lastName : {type : String, lowercase : true},
        email : {type : String, lowercase : true},
        phoneNo : {type : Number, },
        postcode : {type : String,},
        address : {type : String, lowercase : true},
        documentType : {type : String, lowercase : true, default : ""},
        idNumber : {type : String,  default : ""},
        documentPictures : {type : Array, default : []},
        gvierCountry : {type : String, default : ""},
        adminComment : {type : String, default : ""},
        timeStamp :  {type : Date}
    }],
    tokens :[{
        token: {
            type: String
        }
    }],
})

//Login token creation
ClientsDataSchema.methods.generateAuthToken  = async function(){
    try{
        console.log({
            _id: this._id,
            registerAs : this.registerAs
        });

        let token = jwt.sign({
            _id: this._id,
            registerAs : this.registerAs
            }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        console.log("Token Generated in Model 2", token); //Checking if the token has been generated 
        await this.save()
        return(token)
    }
    catch(e){
        console.log("Auth generating Error", e);
    }
}


//Hashing user password
ClientsDataSchema.pre("save", async function(next){
    if(this.isModified("clientPassword")){
        this.clientPassword = await bcrypt.hash(this.clientPassword, 10);
    }
    next();
});

let ClientsData =  new mongoose.model("ClientsData", ClientsDataSchema);

module.exports = ClientsData;