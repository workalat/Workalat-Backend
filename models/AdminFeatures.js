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
    },
    ranking : {
        level_1 : {type: Number, default: 0},
        level_2 : {type: Number, default: 0},
        level_3 : {type: Number, default: 0},
        level_4 : {type: Number, default: 0},
        level_pro : {type: Number, default: 0},
    }

    
})


let AdminFeaturesData =  new mongoose.model("AdminFeaturesData", AdminFeaturesSchema);

module.exports = AdminFeaturesData;