let ProfessionalsData = require("../../models/Professional");
const ProjectsData = require("../../models/Project");

async function enablePayAsYouGoController(req, res){
    let professionalId = req.body.professionalId;
    let current_value = req.body.current_value;
    try{
        let professional = await ProfessionalsData.findOne({_id : professionalId}).select({payAsGo : 1});
        // console.log(professional);
        if(professional === null){
            throw new Error("Data Not Found")
        }
        else{
                if(current_value === true){
                    professional.payAsGo = false;
                    await professional.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", message: `Status changed successfully.`, current_value : false});
                }
                else{
                    professional.payAsGo = true;
                    await professional.save();
                    res.status(200).json({ status : "success" , userStatus : "SUCCESS", message: `Status changed successfully.`, current_value : true});
                }
        }
            
    }
    catch(e){
        console.log("Error while adding Confirming bid", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = enablePayAsYouGoController;