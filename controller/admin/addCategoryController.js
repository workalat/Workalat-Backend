let AdminFeaturesData = require("../../models/AdminFeatures");
async function addCategoryController(req, res){
    try{
        let {category} = req.body;
        let c = category.toLowerCase();
        // let data = await AdminFeaturesData.create({
        //     faqs : [{que : "What is hello world", ans : "Tera baap aya"}],
        //     category : ["cleaning", "technology"],
        //     services : [{category : "cleaning", service : ["home cleaning", "office cleaning"]}, {category : "technology", service : ["website design", "app design"]}],
        //     points : [{point : 5, amount : 10}, {point : 10, amount : 20}],
        //     pointRules : [{point : 5 , category : "cleaning", clientBudget : "20-150"},{point : 15 , category : "technology", clientBudget : "500-3000"}],
        //     maxBids : 10
        // })
        // let data = await AdminFeaturesData.findOne();
        // let rule = [
        //     {point : 5, category : "technology", clientBudget : "0-150"},
        //     {point : 10, category : "technology", clientBudget : "0-500"},
        //     {point : 15, category : "technology", clientBudget : "0-3000"},
        //     {point : 20, category : "technology", clientBudget : "0-3000+"},
        // ]
        // let points = [
        //     {point : 5, amount : 3},
        //     {point : 10, amount : 8},
        //     {point : 15, amount : 12},
        //     {point : 20, amount : 15.2},
        //     {point : 30, amount : 21},
        //     {point : 50, amount : 30},
        //     {point : 100, amount : 65},
        // ];
        // data.points = points;
        // data.pointRules= rule;
        // await data.save();
        
        let data = await AdminFeaturesData.find();
        let s ={
            category : c,
            service : []
        }
        data[0].category.push(c);
        data[0].services.push(s);
        await data[0].save();

        res.status(200).json({status: "success", userStatus : "SUCCESS" , });
    }
    catch(e){
        console.log("Error while adding categories project", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = addCategoryController;