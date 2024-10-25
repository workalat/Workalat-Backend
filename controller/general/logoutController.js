const verification = require("../../middleware/verification");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");


async function logoutController(req, res){
    let token = req.body.token;
    let userType = req.body.userType;
    try{
            let verify = await verification({token: token});
            if(userType === "client"){
                
            let delete_data = await ClientsData.findOne({_id: verify._id});
            let d = delete_data.tokens.filter((val)=>{
                if(val.token !== token){
                    return(val);
                }
            });
            let loggingout = await ClientsData.findByIdAndUpdate({_id: verify._id}, {
                $set: {
                    tokens: d
                }
            });
              res.status(200).json({status : "success",message: "Logged Out Successfully", logout: true}) //Checking if the data has been updated

            }
            else{
                let delete_data = await ProfessionalsData.findOne({_id: verify._id});
            let d = delete_data.tokens.filter((val)=>{
                if(val.token !== token){
                    return(val);
                }
            });
            let loggingout = await ProfessionalsData.findByIdAndUpdate({_id: verify._id}, {
                $set: {
                    tokens: d
                }
            });
              res.status(200).json({status : "success",message:"Logged Out Successfully", logout: true}) //Checking if the data has been updated
            }
    }
    catch(e){
        console.log("Error while Fetching chatScreen Details.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = logoutController;