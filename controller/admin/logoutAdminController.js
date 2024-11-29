const verificationAdmin = require("../../middleware/verificationAdmin");
const AdminData = require("../../models/Admin");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");


async function logoutAdminController(req, res){
    let token = req.body.token;
    try{
            let verify = await verificationAdmin({token: token});
            console.log(verify);
                
            let delete_data = await AdminData.findOne({_id: verify._id});
            let d = delete_data.tokens.filter((val)=>{
                if(val.token !== token){ 
                    return(val);
                }
            });
            await AdminData.findByIdAndUpdate({_id: verify._id}, {
                $set: {
                    tokens: d
                }
            });
              res.status(200).json({status : "success",message: "Logged Out Successfully", logout: true}) //Checking if the data has been updated

            
    }
    catch(e){
        console.log("Error while Fetching chatScreen Details.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = logoutAdminController;