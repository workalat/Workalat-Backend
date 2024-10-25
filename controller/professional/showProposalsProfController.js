let ProfessionalsData = require("../../models/Professional");

async function showProposalsProfController(req, res){
    try{
        let {userId} = req.body;
        let data = await ProfessionalsData.findOne({_id : userId}).select({proposals : 1});
        console.log(data);
        if(data === null){
            throw new Error("No Data Found , please login again");
        }
        else{
            res.status(200).json({ status: "success", userStatus: "SUCCESS", message: "Data Found Successfully", data: data });
        }
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = showProposalsProfController;