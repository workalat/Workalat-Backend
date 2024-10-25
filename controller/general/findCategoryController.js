const AdminFeaturesData = require("../../models/AdminFeatures");
let ClientsData = require("../../models/Client");
let ProfessionalsData = require("../../models/Professional");

async function findCategoryController(req, res){
    try{
        const { serviceName } = req.body;
        const result = await AdminFeaturesData.findOne({
            "services.service": serviceName
        }, { "services.$": 1 }); // Select only the matched service

        if (result && result.services.length > 0) {
            // Return the category
            const category = result.services[0].category;
            res.json({ category });
        } else {
            res.status(404).json({ message: "Service not found" });
        }
    }
    catch(e){
        console.log("Error while marking fetching Dashboard Data.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};


module.exports = findCategoryController;