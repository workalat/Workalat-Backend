const RefundData = require("../../models/Refund");
const TransactionData = require("../../models/Transaction");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function refundTransationController(req, res) {
  try {
    const  transactionId  = req.body.transactionId;
    console.log(req.body);
    let transaction = await TransactionData.findOne({_id : transactionId});
    console.log(transaction);

    if (!transaction || transaction === null) {
      return res.status(400).json({
        status: "fail",
        userStatus: "FAILED",
        message: "Session ID is required",
      });
    }
    let sessionId = transaction.transactionId;

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log( "Session : " ,session);

    if (!session) {
        throw new Error("Session not found");
    }

    // Extract payment_intent from the session
    const paymentIntentId = session.payment_intent;
    console.log( "Payment Intent : " ,paymentIntentId);

    if (!paymentIntentId) {
        throw new Error("Payment Intent not found for the session");
    }

    // Retrieve the payment intent to check the status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log( "Payment Intent  Data : " ,paymentIntent);

    // Check if the payment has already been refunded
    if (paymentIntent.status === "succeeded" && paymentIntent.amount_refunded > 0) {
        throw new Error("This payment has already been refunded");
    }

    // Create a refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    console.log("Refund  :  ", refund);

    if(refund.status === "succeeded"){
        transaction.transactionType = "debit";
        transaction.transactionStatus = "refunded";
        let r = RefundData.create({
            refundData : refund,
            sessionId : sessionId,
        });
        await transaction.save();
    }

    return res.status(200).json({
      status: "success",
      userStatus: "SUCCESS",
      message: "Payment refunded successfully",
    });
  } catch (error) {
    console.error("Error processing refund:", error);
    res.status(500).json({
      status: "fail",
      userStatus: "FAILED",
      message: error.message || "An error occurred while processing the refund",
    });
  }
}

module.exports = refundTransationController;
