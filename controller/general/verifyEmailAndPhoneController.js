let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");
const TicketsData = require("../../models/Tickets");

async function verifyEmailAndPhoneController(req, res){
    try{
        let userId = req.body.userId;
        let userType = req.body.userType; //client, professional, admin
        let data = req.body.data; //phone, email
        if(userType == "client"){
            if(data === "email"){
                let data = await ClientsData.findOne({_id: userId}).select({clientEmail : 1});
                if(data === null){
                    throw new Error("No Data Found");
                }
                res.status(200).json({status: "success" , message: "Data ound Successfullly", data});
            }
            else{
                let data = await ClientsData.findOne({_id: userId}).select({clientPhoneNo : 1});
                if(data === null){
                    throw new Error("No Data Found");
                }
                res.status(200).json({status: "success" , message: "Data ound Successfullly", data});
                
            }
        }
        else{
            if(data === "email"){
                let data = await ProfessionalsData.findOne({_id: userId}).select({professionalEmail : 1});
                if(data === null){
                    throw new Error("No Data Found");
                }
                res.status(200).json({status: "success" , message: "Data ound Successfullly", data});
            }
            else{
                let data = await ProfessionalsData.findOne({_id: userId}).select({professionalPhoneNo : 1});
                if(data === null){
                    throw new Error("No Data Found");
                }
                res.status(200).json({status: "success" , message: "Data ound Successfullly", data});   
            }
        }
    }
    catch(e){
        console.log("Error while marking fetching Dashboard Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = verifyEmailAndPhoneController;