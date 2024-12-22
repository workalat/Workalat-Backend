require("dotenv").config();
let mongoose = require("mongoose");

let ProcessedEventSchema  = new mongoose.Schema({
    eventId : {
        type: String,
        default: "true"
    }
})


let ProcessedEvent =  new mongoose.model("ProcessedEventData", ProcessedEventSchema);

module.exports = ProcessedEvent;