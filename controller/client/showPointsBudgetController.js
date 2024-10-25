let AdminFeaturesData = require("../../models/AdminFeatures");
// console.log(c)
async function showPointsBudgetController(req, res){
    let {category} = req.body;
    let c= category.toLowerCase();
    try{
        let data = await AdminFeaturesData.find().select({pointRules : 1});
        // console.log(data);
        let d = data[0].pointRules.filter((val)=>{
            if(val.category === c){return(val)};
        });
        console.log(d);
        
        res.status(200).json({status: "success", userStatus : "SUCCESS" , data: d});
    }
    catch(e){
        console.log("Error while fetching category data", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }

};

module.exports = showPointsBudgetController;