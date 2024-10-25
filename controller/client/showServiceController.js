let AdminFeaturesData = require("../../models/AdminFeatures");
    async function showServiceController(req, res){
        try{
            let {category} =req.body;
            let data = await AdminFeaturesData.find().select({services : 1});
            console.log(data);
            let d= data[0].services.filter((val)=>{
                if(val.category === category){return(val)}
            })
            console.log(data);
            res.status(200).json({status: "success", userStatus : "SUCCESS" , data: d})
        }
        catch(e){
            console.log("Error while fetching category data", e);
            res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
        }

    };

module.exports = showServiceController;