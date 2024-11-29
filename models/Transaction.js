require("dotenv").config();
let mongoose = require("mongoose");


let TransactionSchema  = new mongoose.Schema({
    transactionId : {
        type : String,
        default : ""
    },
    professionalId:{
        type : String,
        default : ""
    },
    points : {
        type : Number,
        default : 0
    },
    transactionAmount : {
        type : Number,
        default : 0
    },
    transactionDes : {
        type : String,
        default : ""
    },
    des : {
        type : String,
        default : ""
    },
    transactionTimeStamp : {
        type : Date,
        default : Date.now()
    },
    transactionStatus : {
        type : String,
        default : "pending"
    },
    transactionType :{
        type : String,
        default : ""
    }
})


let TransactionData =  new mongoose.model("TransactionData", TransactionSchema);

module.exports = TransactionData;