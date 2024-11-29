require("dotenv").config();
let mongoose = require("mongoose");


let RefundSchema  = new mongoose.Schema({
    refundData : {
        type : Object,
        default : {}
    },
    sessionId : {
        type: String,
        default : ""
    },
    timeStamp : {
        type : Date,
        default : Date.now()
    }
})


let RefundData =  new mongoose.model("RefundData", RefundSchema);

module.exports = RefundData;