let AdminFeaturesData = require("../../models/AdminFeatures");
async function addServiceController(req, res){
    try{
        let category = req.body.category;
        let service = req.body.service;

        let c = category.toLowerCase();
        let s = service.toLowerCase();
        let data = await AdminFeaturesData.find();
        let d = data[0].services.filter((val)=>{
            if(val.category === c) {return(val)}
        })[0].service.push(s);
        await data[0].save();
        res.status(200).json({status: "success", userStatus : "SUCCESS" , message : `${service} added to ${category} category section successfully.`});
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addServiceController;