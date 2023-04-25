const nodemailer = require("nodemailer");
var moment = require('moment');

exports = async function({ query, headers, body}, response) {

    // Make sure that the Fit File is being sent as bytes.
    if (headers["Content-Type"][0] != "application/octet-stream") {
      return "Error: body must be of Content-Type: application/octet-stream.";
    }
    
    // Get the Mail Header
    const mail = headers["Mail"];
    
    // If this is null or the header doesn't have any data
    if (mail == null || mail.length == 0) {
      return "Error: you must provide an email in the Mail header.";
    }
    
    // Get the email address
    const email = mail[0];
    
    // If the email address is null, empty, not a string, or doesn't have an @, raise an error.
    if (email == null || email == "" || typeof email != "string" || email.indexOf("@") == -1) {
      return "Error: invalid email: " + email;
    }
    
    // Get the filename header
    const fileName = headers["Filename"];
    
    // If the header is null or has no data, throw an error.
    if (fileName == null || fileName.length == 0) {
      return "Error: you must provide a filename in the fileName header.";
    }
    
    // Get the filename and make sure it's a valid string.
    var name = fileName[0];
    if (name == null || name == "" || typeof name != "string") {
      return "Error: invalid file name: " + name;
    }

    const reqBody = body;

    // Check if there are bytes in the body, and the body isn't empty.
    if (reqBody == null || reqBody.text() == null || reqBody.text() == "") {
      return "Error: you must provide a body.";
    }
 
    // Send the email, where the user is the created email and the password is to log in to the user.
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'partnerfitnessapp@gmail.com',
        pass: ''
      }
    });
  
    // Create a date to send in the email.
    const m = moment();
      
    const date = m.format("YYYY-MM-DD");
    const time = m.format("HH:mm:ss");
      
    // Email formatting.
    const mailOptions = {
      from: 'partnerfitnessapp@gmail.com',
      to: email,
      subject: 'Exported Fit File - Partner Fitness App',
      html: "<p>Attached to this email is the fit file you exported on " + date + " at " + time + "</p>\nIf you didn't export a fit file, please ignore this email and <b>do not</b> reply.",
       attachments: [
          {
              filename: name + '.fit',
              content: Buffer.from(body.text(), 'binary')
          },
        ]
    };

  // Send the email
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return;
    }
    return "Send email to " + email;
  });
};
