const otpTheme = ({otp}) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border: 1px solid #ddd;
              border-radius: 5px;
              overflow: hidden;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              text-align: center;
              padding: 5px 20px;
            }
            .content {
              padding: 20px;
              color: #333333;
            }
            .footer {
              background-color: #f4f4f4;
              text-align: center;
              color: #888888;
              padding: 10px;
              font-size: 12px;
            }
            a {
              color: #4CAF50;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verify Workalot Account</h1>
            </div>
            <div class="content">
              <p>Your One Time Password (OTP) is ${otp}, please enter this to verify your account. <br />  This OTP will expire in 1 hour. </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Workalat. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  
  module.exports = otpTheme;
  