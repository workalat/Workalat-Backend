let express = require("express");
let app = express();
require("dotenv").config();
let port = process.env.PORT;
let bodyParser = require('body-parser');
let cors = require("cors");
// let nodemailer = require("nodemailer");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let multer = require("multer");
let cloudinary = require("cloudinary");
const twilio = require('twilio');




//Cors Setup 
let corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001','https://workalat-frontend.vercel.app' ],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true,
    optionsSuccessStatus: 204
}
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cors(corsOptions))



//MIDDLEWARES
let verification = require("../middleware/verification");
let sendOtpVerificationEmail = require("../middleware/sendOTPVerificationEmail");
let sendOtpVerificationPhone = require("../middleware/sendOtpVerificationPhone");

//Databases and Models
let db = require("../db/db");
let AdminData = require("../models/Admin");
let AdminFeaturesData  = require("../models/AdminFeatures");
let ClientsData= require ("../models/Client");
let ProfessionalsData = require("../models/Professional");
let ProjectsData = require("../models/Project");
let AwardedData = require("../models/Awarded");
let OtpVerificationData = require("../models/OtpVerification");
let OtpVerificationPhoneData = require("../models/OtpVerificationPhone");


//CLOUDINARY & MULTER CONFIGURATION
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })



/////////////////////////////////////////////////////  Routes  //////////////////////////////////////////////////////////////////////////////////
//General Routes
let findAllServiceRoute = require("../Routes/general/findAllServiceRoute");
let verifyTokenRoute = require("../Routes/general/verifyTokenRoute");
let verifyEmailRoute = require("../Routes/general/verifyEmailRoute");
let verifyPhoneRoute = require("../Routes/general/verifyPhoneRoute");
let verifyPhoneVerificationRoute = require("../Routes/general/verifyPhoneVerificationRoute");
let sendEmailOtpRoute = require("../Routes/general/sendEmailOtpRoute");
let sendPhoneOtpRoute = require("../Routes/general/sendPhoneOtpRoute");
let signupEmailRoute = require("../Routes/general/signupEmailRoute");
let verifyEmailOtpRoute = require("../Routes/general/verifyEmailOtpRoute");
let verifyPhoneOtpRoute = require("../Routes/general/verifyPhoneOtpRoute");
let signupGoogleRoute = require("../Routes/general/signupGoogleRoute");
let signinGoogleRoute = require("../Routes/general/signinGoogleRoute");
let signinEmailRoute = require("../Routes/general/signinEmailRoute");
let changeEmailRoute = require("../Routes/general/changeEmailRoute");
let changeProfilePictureRoute = require("../Routes/general/changeProfilePictureRoute");
let changePhoneNoRoute = require("../Routes/general/changePhoneNoRoute");
let changePasswordRoute = require("../Routes/general/changePasswordRoute");
let forgetPasswordEmailSendRoute = require("../Routes/general/forgetPasswordEmailSendRoute");
let changePasswordLoginRoute = require("../Routes/general/changePasswordLoginRoute");
let signupLinkedinRoute = require("../Routes/general/signupLinkedinRoute");
let signinLinkedinRoute = require("../Routes/general/signinLinkedinRoute");
let kycDetailsRoute = require("../Routes/general/kycDetailsRoute");
let kycDocumentRoute = require("../Routes/general/kycDocumentRoute");
let twoFactRoute = require("../Routes/general/twoFactRoute");
let lastChangesDetailsRoute = require("../Routes/general/lastChangesDetailsRoute");
let projectFileUploadingRoute = require("../Routes/general/projectFileUploadingRoute");
let markAsCompletedRoute = require("../Routes/general/markAsCompletedRoute");
let projectTaskListRoute = require("../Routes/general/projectTaskListRoute");
let createTicketRoute = require("../Routes/general/createTicketRoute");
let respondTicketRoute = require("../Routes/general/respondTicketRoute");
let getUserPhoneNoRoute = require("../Routes/general/getUserPhoneNoRoute");
let dashboardDataRoute = require("../Routes/general/dashboardDataRoute");
let findCategoryRoute = require("../Routes/general/findCategoryRoute");
let ticketsDataRoute = require("../Routes/general/ticketsDataRoute");
const findSingleTicketController = require("../Routes/general/findSingleTicketRoute");
const getPointsCategoryController = require("../Routes/general/getPointsCategoryRoute");
const generateInvoiceRoute = require("../Routes/general/generateInvoiceRoute");
const getPointsBudgetWalletRoute = require("../Routes/general/getPointsBudgetWalletRoute");
const logoutRoute = require("../Routes/general/logoutRoute");
const projectHistoryRoute = require("../Routes/general/projectHistoryRoute");
const userChatDetailsRoute = require("../Routes/general/userChatDetailsRoute");
const verifyPhoneOtpControllerWithoutIdRoute = require("../Routes/general/verifyPhoneOtpControllerWithoutIdRoute");
const verifyEmailOtpWithoutIdRoute = require("../Routes/general/verifyEmailOtpWithoutIdRoute");
const sendEmailOtpWidRoute = require("../Routes/general/sendEmailOtpWidRoute");
const sendPhoneOtpWidRoute = require("../Routes/general/sendPhoneOtpWidRoute");




let getChatDetailsRoute = require("../Routes/general/getChatDetailsRoute");
let getNotificationRoute = require("../Routes/general/getNotificationRoute");
let markAsAvailalbeRoute = require("../Routes/general/markAsAvailalbeRoute");
let activeChatRoute = require("../Routes/general/activeChatRoute");
let changesRequestRoute = require("../Routes/general/changesRequestRoute");
let chatNotificationcRoute = require("../Routes/general/chatNotificationcRoute");
let reminderToReplyRoute = require("../Routes/general/reminderToReplyRoute");

//Client Routes
let signupPhoneRoute = require("../Routes/client/signupPhoneRoute");
let showCategoryRoute = require("../Routes/client/showCategoryRoute");
let showServiceRoute = require("../Routes/client/showServiceRoute");
let showPointsBudgetRoute = require("../Routes/client/showPointsBudgetRoute");
let getJobsQuestionsRoute = require("../Routes/client/getJobsQuestionsRoute");
let postProjectRoute = require("../Routes/client/postProjectRoute");
let projectFileRoute =  require("../Routes/client/projectFileRoute");
let getProjectsRoute = require("../Routes/client/getProjectsRoute");
let getSingleProjectRoute = require("../Routes/client/getSingleProjectRoute");
let getProjectProposalRoute = require("../Routes/client/getProjectProposalRoute");
let getAwardedDetailsRoute = require("../Routes/client/getAwardedDetailsRoute");
let addPersonalClientInfoController =  require("../Routes/client/addPersonalClientInfoRoute");
let getPersonalClientInfoRoute =  require("../Routes/client/getPersonalClientInfoRoute");
let projectAwardRoute =  require("../Routes/client/projectAwardRoute");
let createMilestoneRoute =  require("../Routes/client/createMilestoneRoute");
let payMilestoneRoute =  require("../Routes/client/payMilestoneRoute");
let addingMilestonePaymentDataRoute =  require("../Routes/client/addingMilestonePaymentDataRoute");
let payCompleteProjectRoute =  require("../Routes/client/payCompleteProjectRoute");
let addingCompletePaymentDataRoute =  require("../Routes/client/addingCompletePaymentDataRoute");
let clientReviewTakingRoute =  require("../Routes/client/clientReviewTakingRoute");
let switchIntoProfessionalRoute =  require("../Routes/client/switchIntoProfessionalRoute");
let clientDetailsRoute =  require("../Routes/client/clientDetailsRoute");
let markAsAwardedRoute =  require("../Routes/client/markAsAwardedRoute");
let cancelProjectRoute =  require("../Routes/client/cancelProjectRoute");
let signupClientEmailSendRoute =  require("../Routes/client/signupClientEmailSendRoute");


//Professional Routes
let addPhoneNoProfessionalRoute = require("../Routes/professional/addPhoneNoProfessionalRoute");
let addDetailsProfessionalsRoute = require("../Routes/professional/addDetailsProfessionalsRoute");
let addProfessionalServicesRoute = require("../Routes/professional/addProfessionalServicesRoute");
let showLeadsRoute = require("../Routes/professional/showLeadsRoute");
let projectFilterRoute = require("../Routes/professional/projectFilterRoute");
let showSingleProjectProfRoute = require("../Routes/professional/showSingleProjectProfRoute");
let showProposalsProfRoute = require("../Routes/professional/showProposalsProfRoute");
let showAwardedShortProfRoute = require("../Routes/professional/showAwardedShortProfRoute");
let showAllAwardedProfRoute = require("../Routes/professional/showAllAwardedProfRoute");
let addPersonalnfoProfP1Route = require("../Routes/professional/addPersonalnfoProfP1Route");
let addPersonalInfoProfP2Route = require("../Routes/professional/addPersonalInfoProfP2Route");
let getPersonalInfoProfP1Route = require("../Routes/professional/getPersonalInfoProfP1Route");
let getPersonalInfoProfP2Route = require("../Routes/professional/getPersonalInfoProfP2Route");
let professionalCheckBidRoute = require("../Routes/professional/professionalCheckBidRoute");
let confirmBidRoute = require("../Routes/professional/confirmBidRoute");
let payAsYouGoProjectRoute = require("../Routes/professional/payAsYouGoProjectRoute");
let addPayAsYouGoProjectDetailRoute = require("../Routes/professional/addPayAsYouGoProjectDetailRoute");
let walletTopupProfessionalRoute = require("../Routes/professional/walletTopupProfessionalRoute");
let addWalletTopupDataProfessionalRoute = require("../Routes/professional/addWalletTopupDataProfessionalRoute");
let acceptAwardedProjectsRoute = require("../Routes/professional/acceptAwardedProjectsRoute");
let acceptMilestonePaymentRoute = require("../Routes/professional/acceptMilestonePaymentRoute");
let completeProjectRoute = require("../Routes/professional/completeProjectRoute");
let professionalReviewTakingRoute = require("../Routes/professional/professionalReviewTakingRoute");
let switchIntoClientRoute = require("../Routes/professional/switchIntoClientRoute");
let professionalDetailsRoute = require("../Routes/professional/professionalDetailsRoute");
let applyCertificationRoute = require("../Routes/professional/applyCertificationRoute");
let purchaseMembershipRoute = require("../Routes/professional/purchaseMembershipRoute");
let addMembershipPurchaseDataRoute = require("../Routes/professional/addMembershipPurchaseDataRoute");
let requestCancelMembershipRoute = require("../Routes/professional/requestCancelMembershipRoute");
let professionalSignupRoute = require("../Routes/professional/professionalSignupRoute");
let getMembershipDetailsRoute = require("../Routes/professional/getMembershipDetailsRoute");
let walletTransactionHistoryRoute = require("../Routes/professional/walletTransactionHistoryRoute");
let enablePayAsYouGoRoute = require("../Routes/professional/enablePayAsYouGoRoute");
let showSingleProjectLeadRoute = require("../Routes/professional/showSingleProjectLeadRoute");


//Admin Routes / Milestone 3
let addCategoryRoute = require("../Routes/admin/addCategoryRoute");
let addServiceRoute = require("../Routes/admin/addServiceRoute");
let addQuestionsRoute = require("../Routes/admin/addQuestionsRoute");
let addJobQuestionRoute = require("../Routes/admin/addJobQuestionRoute");
let certificationApprovalRoute = require("../Routes/admin/certificationApprovalRoute");
let kycApprovalRoute = require("../Routes/admin/kycApprovalRoute");
let addAdminRoute = require("../Routes/admin/addAdminRoute");
const addPointsBudgetController = require("../controller/admin/addPointsBudgetController");
const allTicketsDataRoute = require("../Routes/admin/allTicketsDataRoute");
const showAllLeadsRoute = require("../Routes/admin/showAllLeadsRoute");
const showSingleLeadsBidRoute = require("../Routes/admin/showSingleLeadsBidRoute");
const leadsStatusChangeRoute = require("../Routes/admin/leadsStatusChangeRoute");
const showallKycDataRoute = require("../Routes/admin/showallKycDataRoute");
const showSingleKycDataRoute = require("../Routes/admin/showSingleKycDataRoute");
const showallCertificateDataRoute = require("../Routes/admin/showallCertificateDataRoute");
const showSingleCertificationDataRoute = require("../Routes/admin/showSingleCertificationDataRoute");


/////////////////////////////////////////////////////// API Stuffs /////////////////////////////////////////////////////////////////////////////////////
app.get("/", async (req, res)=>{
    res.status(200).json({msg : "Hello World"});
});

/////////////////////////////////////////////////////// GENERAL API'S /////////////////////////////////////////////////////////////////////////////////////
//TOKEN VERIFICATION/DATA FETCHING FROM TOKEN
app.use("/getAllService", findAllServiceRoute);

//TOKEN VERIFICATION/DATA FETCHING FROM TOKEN
app.use("/verify", verifyTokenRoute);

//VERIFY EMAIL OF PROFESSIONAL'S AND CLIENT'S
app.use("/verify-email", verifyEmailRoute);

//VERIFY PHONE OF PROFESSIONAL'S AND CLIENT'S
app.use("/verify-phone", verifyPhoneRoute)


//VERIFY PHONE OF PROFESSIONAL'S AND CLIENT'S
app.use("/phoneVerifyPage", verifyPhoneVerificationRoute)

//SEND OTP EMAIL TO PROFESSIONAL'S / CLIENTS 
app.use("/sendEmailOtp", sendEmailOtpRoute)


//SEND OTP ON PHONE NO TO PROFESSIONAL'S / CLIENTS 
app.use("/sendPhoneOtp", sendPhoneOtpRoute)

//CREATING CLIENT ACCOUNT WITH SIGNUP
app.use("/signup-phone", signupPhoneRoute)

//CREATING PROFESSIONALS /UPDATING CLIENT ACCOUNT WITH EMAIL ADDRESS AND PASSWORD
app.use("/signupEmail",signupEmailRoute)

//Api for verifying email OTP
app.use("/verify-emailOtp",verifyEmailOtpRoute);

//Api for verifying phone OTP
app.use("/verify-phoneOtp", verifyPhoneOtpRoute);

//CLIENT AND PROFESSIONAL SIGIN WITH GOOGLE
app.use("/signupGoogle", signupGoogleRoute);

//CLIENT AND PROFESSIONAL SIGIN WITH EMAIL
app.use("/signinEmail", signinEmailRoute);

//CLIENT AND PROFESSIONAL SIGIN WITH GOOGLE
app.use("/signinGoogle", signinGoogleRoute);


//CLIENT AND PROFESSIONAL SIGIN WITH GOOGLE
app.use("/signinLinkedin", signinLinkedinRoute);

//IF THE CLIENT OR PROFESSIONAL REQUEST TO CHANGE THEIR EMAIL
app.use("/changeEmail", changeEmailRoute);

//IF THE CLIENT OR PROFESSIONAL REQUEST TO CHANGE THEIR EMAIL
app.use("/forgetPasswordLoginEmail", forgetPasswordEmailSendRoute);



//IF THE CLIENT OR PROFESSIONAL REQUEST TO CHANGE THEIR PROFILE PICTURE
app.use("/changePicture", changeProfilePictureRoute);

//IF THE CLIENT OR PROFESSIONAL REQUEST TO CHANGE THEIR PHONE NO
app.use("/changePhone", changePhoneNoRoute);

//IF THE CLIENT OR PROFESSIONAL REQUEST TO CHANGE THEIR PASSWORD
app.use("/changePassword", changePasswordRoute);


//IF THE CLIENT OR PROFESSIONAL REQUEST TO CHANGE THEIR PASSWORD
app.use("/changePasswordLogin", changePasswordLoginRoute);


//ADDING KYC DETAILS TO BOTH CLIENT AND PROFESSIONAL
app.use("/kycDetails", kycDetailsRoute);


//ADDING KYC DOCUMENTS TO BOTH CLIENT AND PROFESSIONAL
app.use("/kycDocuments", kycDocumentRoute);


//ADDING KYC DETAILS TO BOTH CLIENT AND PROFESSIONAL
app.use("/twoFactSwitch", twoFactRoute);


//GETTING DETAILS OF LAST CHANGING DATES OF KYC, PHONE NUMBER ETC OF CLIENT AND PROFESSIONAL
app.use("/lastChangeDetails", lastChangesDetailsRoute);


//UPLOADING PROJECT FILES ALLOWING BOTH PROFESSIONAL AND CLIENT
app.use("/uploadProjectFile", projectFileUploadingRoute);


//WHEN A CLIENT OR PROFESSIONAL WANTS TO MARK A PROJECT AS COMPLETED
app.use("/markAsCompleted", markAsCompletedRoute);


//WHEN A CLIENT OR PROFESSIONAL WANTS TO MARK A PROJECT AS COMPLETED
app.use("/addProjectTaskList", projectTaskListRoute);


//WHEN A CLIENT OR PROFESSIONAL WANTS TO MARK A PROJECT AS COMPLETED
app.use("/addProjectTaskList", projectTaskListRoute);


//CLIENT AND PROFESSIONAL SIGNUP WITH LINKEDIN
app.use("/signupLinkedin", signupLinkedinRoute);


//WHEN A CLIENT OR PROFESSIONAL WANTS TO CREATE A TICKET
app.use("/createTicket", createTicketRoute);


//WHEN A CLIENT OR PROFESSIONAL WANTS TO CREATE A TICKET
app.use("/respondTicket", respondTicketRoute);


//Toggle

//WHEN CLIETNS/PROFESSIONAL VISITS PREERENCES PAGE
app.use("/getChatPage", getChatDetailsRoute);


//WHEN CLIETNS/PROFESSIONAL VISITS NOTIFICATIONS PAGE
app.use("/getNotificationPage", getNotificationRoute);


//WHEN A CLIENT OR PROFESSIONAL WANTS ENABLE/DISABLE MARK AS UNAVAILABLE
app.use("/markAsUnavailable", markAsAvailalbeRoute);
 

//WHEN A CLIENT OR PROFESSIONAL WANTS ENABLE/DISABLE AVAILIBILUTY OF CHATS
app.use("/activeChat", activeChatRoute);

//WHEN A CLIENT OR PROFESSIONAL WANTS ENABLE/DISABLE AVAILIBILUTY OF CHATS
app.use("/changeRequest", changesRequestRoute);


//WHEN A CLIENT OR PROFESSIONAL WANTS ENABLE/DISABLE CHAT NOTIFICATTION SETTING
app.use("/chatNotifications", chatNotificationcRoute);

//WHEN A CLIENT OR PROFESSIONAL WANTS ENABLE/DISABLE CHAT NOTIFICATTION SETTING
app.use("/reminderToReply", reminderToReplyRoute);



//WHEN A CLIENT OR PROFESSIONAL WANTS TO SEE THEIR DASHBOARD DATA
app.use("/dashboardData", dashboardDataRoute);



//WHEN Someone wants to see catefories according to the service
app.use("/findServiceCategory", findCategoryRoute);


//WHEN Someone wants to see catefories according to the service
app.use("/findAllTickets", ticketsDataRoute);


//WHEN Someone wants to see catefories according to the service
app.use("/findSingleTicket", findSingleTicketController);


//WHEN Someone wants to see catefories according to the service
app.use("/getPointsCategory", getPointsCategoryController);



//WHEN Someone wants to see catefories according to the service
app.use("/generateInvoice", generateInvoiceRoute);


//WHEN Someone wants to see catefories according to the service
app.use("/getPointsWallet", getPointsBudgetWalletRoute);

//WHEN Someone wants to see catefories according to the service
app.use("/logout", logoutRoute);


//WHEN Someone wants to see catefories according to the service
app.use("/projectHistory", projectHistoryRoute);


//WHEN Someone wants to see catefories according to the service
app.use("/userChatDetails", userChatDetailsRoute);


//WHEN Someone wants to verify the PHONE OTP without USER ID
app.use("/verifyPhoneOtpWoId", verifyPhoneOtpControllerWithoutIdRoute);


//WHEN Someone wants to verify the EMAIL OTP without USER ID
app.use("/verifyEmailOtpWoId", verifyEmailOtpWithoutIdRoute);


//WHEN Someone wants to verify the EMAIL OTP without USER ID
app.use("/resendEmailOtpWId", sendEmailOtpWidRoute);


//WHEN Someone wants to verify the EMAIL OTP without USER ID
app.use("/resendPhoneOtpWId", sendPhoneOtpWidRoute);


////////////////////////////////  CLIENT APIS ////////////////////////////////////////////

//SHOW CATEGORY
app.use("/showCategory", showCategoryRoute);

//SHOW SERVICES
app.use("/showServices", showServiceRoute);

//SHOW POINTS BUDGET
app.use("/showPointsBudget",showPointsBudgetRoute);

//WHEN CLIENT WANT TO FETCH DATA OF QUESTIONS
app.use("/getJobsQuestions", getJobsQuestionsRoute);


//CLIENT POSTING PROJECT
app.use("/postProject", postProjectRoute);

//CLIENT POSTING PROJECT
app.use("/postProjectFile", projectFileRoute);

//GET ALL THE POSTED PROJECTS OF CLIENTS SHORTLY
app.use("/getProjectsClient", getProjectsRoute);

//GET SINGLE PROJECT DETAILS
app.use("/getSingleProjectClient", getSingleProjectRoute)


//GET PROPSOALS DETAILS OF A PROJECT
app.use("/getProjectProposalClient", getProjectProposalRoute); 

//SHOW PROJECTS HISTORY (AWARDED PROJECTS)
app.use("/getAwardedDetails", getAwardedDetailsRoute);


//ADDING PERSONAL INFORMATION PART 1 CLIENTS
app.use("/addPersonalClientInfo", addPersonalClientInfoController);

//GET PERSONAL INFORMATION PART 1 CLIENTS
app.use("/getPersonalClientInfo", getPersonalClientInfoRoute);

//AWARD PROJECTS BY CLIENTS
app.use("/awardProject", projectAwardRoute);


//AWARD PROJECTS BY CLIENTS
app.use("/createMilestone", createMilestoneRoute);

//PAYING MILESTONE AMOUNT CREATED BY CLIENT
app.use("/payMiestone", payMilestoneRoute);

//ADDING MILESTONE PAID AMOUNT DATA TO BACKEND
app.use("/addingMilestoneData", addingMilestonePaymentDataRoute);


//PAYING COMPLETE PROJECT AMOUNT
app.use("/payCompleteProject", payCompleteProjectRoute);


//ADDING COMPLETE PROJECT PAYMENT DATA TO BACKEND
app.use("/addingcompletePaymentData", addingCompletePaymentDataRoute);


//CLIENT RECIEVEING REVIEWS FROM PROFESSIONAL
app.use("/clientReviewSubmitting", clientReviewTakingRoute);


//CLIENT SWITCHING INTO PROFESSIONAL
app.use("/clientSwitchToProfessional", switchIntoProfessionalRoute);


//WHEN SOMEONE WANTS TO SEE CLIENTS DETAILS
app.use("/clientDetails", clientDetailsRoute);

//WHEN CLIENT WANTS TO MARK A PROJECT AS AWARDED
app.use("/markAsAwarded", markAsAwardedRoute);
 

//WHEN CLIETNS WANTS TO CANCEL THE PROJECT
app.use("/cancelProject", cancelProjectRoute);


//WHEN CLIETNS/PROFESSIONALS WANTS TO SEE THEIR PHONE NO
app.use("/getUserPhone", getUserPhoneNoRoute);


//WHEN CLIETNS WANTS TO SIGNUP USING EMAIL AND SEND OTP
app.use("/clientSendEmailOtp", signupClientEmailSendRoute);





////////////////////////////////  PROFESSIONAL'S APIS ////////////////////////////////////////////

//ADDING MOBILE NUMBER TO PROFESSOINAL'S ACCOUNT
app.use("/addPhoneNoProfessional", addPhoneNoProfessionalRoute);

//ADDING PROFESSIONAL DETAILS
app.use("/addDetailsProfessionals", addDetailsProfessionalsRoute);

//ADDING PROFESSIONAL DETAILS
app.use("/addProfessionalServices", addProfessionalServicesRoute);

//SHOWING LEADS TO PROFESSIONALS
app.use("/showLeads", showLeadsRoute);


//FILTERING LEADS TO PROFESSIONALS
app.use("/projectFilter", projectFilterRoute);


//SHOW A PARTICULAR PROJECT TO THE PROFESSIONAL
app.use("/showSingleProjectProf", showSingleProjectProfRoute);

//SHOW PROPOSALS
app.use("/showProposalsProf", showProposalsProfRoute);


//SHOW AWARDED PROJECTS (SINGLE AND NOT COMPLETED)
app.use("/showAwardedShortProf", showAwardedShortProfRoute);


//SHOW ALL RECEENT AWARDED PROJECTS 
app.use("/showAllAwardedProf", showAllAwardedProfRoute);

//ADDING PERSONAL INFORMATION PART 1 CLIENTS
app.use("/addPersonalnfoProfP1", addPersonalnfoProfP1Route);


//ADDING PERSONAL INFORMATION PART 2 CLIENTS
app.use("/addPersonalInfoProfP2", addPersonalInfoProfP2Route);

//GET PERSONAL INFORMATION PART 1 CLIENTS
app.use("/getPersonalInfoProfP1", getPersonalInfoProfP1Route);

//ADDING PERSONAL INFORMATION PART 2 CLIENTS
app.use("/getPersonalInfoProfP2", getPersonalInfoProfP2Route);


//CHECKING TOTAL BIDS OF CLIENT AND SEEING IF HE IS ELEIGIBLE TO APPLY ON A PROJECT
app.use("/professionalCheckBid", professionalCheckBidRoute);

//PAY AS YOU GO BY PROFESSIONAL PROFESSIONAL
app.use("/payAsYouGoProject", payAsYouGoProjectRoute);

//ADD PAY AS YOU GO DATA TO PROFESSIONAL DATABASE
app.use("/addPayAsYouGoProjectDetails", addPayAsYouGoProjectDetailRoute);

//CONFIRM BID ON A PROJECT
app.use("/confirmBid", confirmBidRoute);


//WALLET TOPUP PROFESSIONAL
app.use("/walletTopupProfessional", walletTopupProfessionalRoute);

//WALLET TOPUP PROFESSIONAL
app.use("/addWalletTopupProfessional", addWalletTopupDataProfessionalRoute);

//WALLET TOPUP PROFESSIONAL
app.use("/acceptAwardedProjects", acceptAwardedProjectsRoute);


//ACCEPT MILESTONE PAYMENT 
app.use("/acceptMilestonePayment", acceptMilestonePaymentRoute);


//COMPLETE PROJECT BY PROFESSIONAL
app.use("/completeProject", completeProjectRoute);


//PROFESSIONAL REVIEW TAKING
app.use("/professionalReviewSubmitting", professionalReviewTakingRoute);


//PROFESSIONAL SWITCHING INTO CLIENT CONTROLLER
app.use("/professionalSwitchToClient", switchIntoClientRoute);


//PROFESSIONAL SWITCHING INTO CLIENT CONTROLLER
app.use("/professionalDetails", professionalDetailsRoute);

//WHEN PROFESSIONAL APPLY FOR CERTIFICATION
app.use("/applyCertification", applyCertificationRoute);

//WHEN PROFESSIONAL WANTS TO PURCHASE MEMBERSHIP
app.use("/purchaseMembership", purchaseMembershipRoute);

//ADDING MEMBERSHIP PURCHASE DATA IN DATABASE
app.use("/addpurchaseMembershipData", addMembershipPurchaseDataRoute);

//WHEN PROFESSIONAL REQUEST TO CANCEL THE MEMBERSHIP
app.use("/requestCancelMembership", requestCancelMembershipRoute);

//WHEN PROFESSIONAL REQUEST TO CANCEL THE MEMBERSHIP
app.use("/professionalSignup", professionalSignupRoute);


//WHEN PROFESSIONAL REQUEST TO CANCEL THE MEMBERSHIP
app.use("/getMembershipData", getMembershipDetailsRoute);


//WHEN PROFESSIONAL REQUEST TO CANCEL THE MEMBERSHIP
app.use("/walletTransactionData", walletTransactionHistoryRoute);

//WHEN PROFESSIONAL REQUEST TO CANCEL THE MEMBERSHIP
app.use("/changePayAsYouGo", enablePayAsYouGoRoute);


//WHEN PROFESSIONAL REQUEST TO CANCEL THE MEMBERSHIP
app.use("/showSingleProjectLead", showSingleProjectLeadRoute);


////////////////////////////////  ADMIN APIS /  MILESTONE 3 ////////////////////////////////////////////
//Add Category
app.use("/addCategory", addCategoryRoute);

//ADD SERVICES
app.use("/addService", addServiceRoute);

//ADD JOBS'S QUESTIONS
app.use("/addQuestions", addQuestionsRoute);


//ASSIGN QUESTIONS TO SERVICES/CATEGORIES
app.use("/addJobsQuestions", addJobQuestionRoute);


//CERTIFICATION APPROVAL
app.use("/certificationApproval", certificationApprovalRoute);


//KYC APPROVAL
app.use("/kycApproval", kycApprovalRoute);

//ADD ADMINGS
app.use("/addAdmins", addAdminRoute);

//ADD POINTS RULE
app.use("/addPointsRule", addPointsBudgetController);


//KYC APPROVAL
app.use("/allTicketsData", allTicketsDataRoute);


//Show All Leads
app.use("/showAllLeads", showAllLeadsRoute);


//Show single Leads Bids
app.use("/showsingleProjectBids", showSingleLeadsBidRoute);


//Change status of leads
app.use("/changeLeadsStatus", leadsStatusChangeRoute);



//Show all Kyc Data 
app.use("/showAllKyc", showallKycDataRoute);


//Show Single Kyc Data 
app.use("/showSingleKyc", showSingleKycDataRoute);

//Show All Certification Data
app.use("/showallCertificate", showallCertificateDataRoute);


//Show All Certification Data
app.use("/showSingleCertificate", showSingleCertificationDataRoute);



//////////////////////////// LISTNEING PORT /////////////////////////////////////////
app.listen(port, ()=>{
    console.log(`Server is active on port : ${port}`)
})