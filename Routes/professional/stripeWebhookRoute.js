let express = require("express");
let stripeWebhookController = require("../../controller/professional/stripeWebhookController");
const bodyParser = require('body-parser');

let router = express.Router();

router.post("/",stripeWebhookController);

module.exports = router;