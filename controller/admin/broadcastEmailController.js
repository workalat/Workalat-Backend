const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const broadcastEmailTheme = require("../../components/email-themes/broadcastEmailTheme");



// Function to create transporter for SMTP
const getTransporter = (from) => {
    let config;
    switch (from) {
      case "system":
        config = { user: process.env.BROADCAST_SYSTEM_EMAIL, pass: process.env.BROADCAST_SYSTEM_PASSWORD };
        break;
      case "user":
        config = { user: process.env.BROADCAST_USER_EMAIL, pass: process.env.BROADCAST_USER_PASSWORD };
        break;
      case "customer":
        config = { user: process.env.BROADCAST_CUSTOMER_EMAIL, pass: process.env.BROADCAST_CUSTOMER_PASSWORD };
        break;
      default:
        throw new Error("Invalid sender email");
    }

    return nodemailer.createTransport({
      host: process.env.BROADCAST_SMTP_HOST,
      port: process.env.BROADCAST_SMTP_PORT,
      secure: process.env.BROADCAST_SMTP_SECURE === "true", // true for 465, false for 587
      auth: { user: config.user, pass: config.pass },
      pool: true,
      maxConnections: 5,
      rateLimit: 5, // Max 5 emails per second
      rateDelta: 1000, // Time window in ms
    });
}

async function broadcastEmailController(req, res){
    try{

      let fromName = req.body.fromName;  //system, user, customer
      let from = req.body.from;  //abc@gmail.com
      let to = req.body.to;  //[abc@gmail.com, cde@gmail.com]
      let subject = req.body.subject;
      let message = req.body.message;

      const transporter = getTransporter(fromName);

        //  // Email options
        //   const mailOptions = {
        //     from: from,
        //     to: to.join(","), // Join recipients as a comma-separated string
        //     subject: subject,
        //     html: broadcastEmailTheme({ subject, message }), 
        //   };

        //   // Send email
        //   await transporter.sendMail(mailOptions);

           // Sending emails to each recipient individually
           for (const recipient of to) {
            console.log( `Sending to ${recipient}`)
            const mailOptions = {
                from: from, // Adjust the sender email format as needed
                to: recipient,
                subject,
                html: broadcastEmailTheme({ subject, message }),
            };

            await transporter.sendMail(mailOptions);
        }

        
        res.status(200).json({status: "success", userStatus : "SUCCESS" , message: "Emails sent successfully!" });
        
    }
    catch(e){
        console.log("Error while sending broadcast emails.", e);
        res.status(400).json({status : "fail", userStatus : "FAILED" ,message : e.message});
    }
};

module.exports = broadcastEmailController;