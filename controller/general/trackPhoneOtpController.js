let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function trackPhoneOtpController(req, res){
   
    try{
        const callSid = req.body.CallSid;
        const callStatus = req.body.CallStatus; // Status of the call (e.g., 'answered', 'completed')
      
        console.log(`Call SID: ${callSid}, Status: ${callStatus}`);
      
        if (callStatus === 'in-progress') {
          console.log('Call has been answered.');
        }
        else if(callStatus === "completed"){
            console.log("Call ended");
        }
        else if(callStatus === "no-answer"){
            console.log("Call no-answer");
        }
        else if(callStatus === "failed"){
            console.log("Call failed");
        }
        else if(callStatus === "busy"){
            console.log("Call busy");
        }
      
        console.log("Call finished");
        res.status(200).send('Status received');

    }
    catch(e){
        console.log("Error while changing email. ", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = trackPhoneOtpController;