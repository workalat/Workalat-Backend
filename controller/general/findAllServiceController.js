let AdminFeaturesData = require("../../models/AdminFeatures");

async function findAllServiceController(req, res){
    try{
        const results = await AdminFeaturesData.find({}, 'services'); // Fetch only the services field
        console.log(results);
        // Extract all services into a single array
        const allServices = results.flatMap(item => item.services.map(service => service.service)).flat();

        // Return the unique services
        const uniqueServices = [...new Set(allServices.flat())]; // Remove duplicates

        res.status(200).json(uniqueServices);
    }
    catch(e){
        console.log("Error while Creating ticket.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = findAllServiceController;