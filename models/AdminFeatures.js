require("dotenv").config();
let mongoose = require("mongoose");


let AdminFeaturesSchema  = new mongoose.Schema({
    faqs : [{
        que : {type : String},
        ans : {type : String}
    }],
    category : {
        type : Array
    },
    services: [{
        category : {type : String},
        service : {type :Array}
    }],
    points: [{
        point : {type : Number},
        amount : {type : Number},
    }],
    pointRules :[{
        point : {type : Number},
        category : {type : String},
        frequency : {type : String},
        budget : {type : Number}
    }],
    maxBids : {
        type : Number,
        default : 10
    },
    categoryQuesions : {
        type : Array,
        default : []
    },
    serviceQuestions : {
        type : Array,
        default : []
    }

    
})


let AdminFeaturesData =  new mongoose.model("AdminFeaturesData", AdminFeaturesSchema);

module.exports = AdminFeaturesData;