let ProfessionalsData = require("../../models/Professional");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function generateInvoiceController(req, res){
    try{
      const { sessionId } = req.body; 

        // Check if sessionId is provided
        if (!sessionId) {
          return res.status(400).json({ error: 'Session ID is required.' });
        }
  
        // Retrieve the session
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        
     // Check if customer is valid
     if (!session.customer) {
      return res.status(400).json({ error: 'Customer not found for the session.' });
    }

    // Create an invoice for the customer
    const invoice = await stripe.invoices.create({
      customer: session.customer,
      auto_advance: true, // Automatically finalize the invoice
    });

    // Finalize the invoice to generate the hosted URL and PDF
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // Check if invoice has the hosted_invoice_url and invoice_pdf
    if (finalizedInvoice.hosted_invoice_url && finalizedInvoice.invoice_pdf) {
      res.status(200).json({
        status : "success",
        userStatus: "SUCCESS",
        hostedInvoiceUrl: finalizedInvoice.hosted_invoice_url,
      });
    } else {
      res.status(400).json({ error: 'Failed to generate invoice URL or PDF.' });
    }

    }
    catch(e){
        console.log("Error while adding professional's details", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = generateInvoiceController;