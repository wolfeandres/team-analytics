const nodemailer = require("nodemailer");
var moment = require('moment');

exports = async function({ query, headers, body}, response) {

    if (headers["Content-Type"][0] != "application/octet-stream") {
      return "Error: body must be of Content-Type: application/octet-stream.";
    }
    
    const mail = headers["Mail"];
    
    if (mail == null || mail.length == 0) {
      return "Error: you must provide an email in the Mail header.";
    }
    
    const email = mail[0];
    
    if (email == null || email == "" || typeof email != "string" || email.indexOf("@") == -1) {
      return "Error: invalid email: " + email;
    }
    
    const fileName = headers["Filename"];
    
    if (fileName == null || fileName.length == 0) {
      return "Error: you must provide a filename in the fileName header.";
    }
    
    var name = fileName[0];
    if (name == null || name == "" || typeof name != "string") {
      return "Error: invalid file name: " + name;
    }

    const reqBody = body;

    if (reqBody == null || reqBody.text() == null || reqBody.text() == "") {
      return "Error: you must provide a body.";
    }
 
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'partnerfitnessapp@gmail.com',
        pass: ''
      }
    });
  
    const m = moment();
      
    const date = m.format("YYYY-MM-DD");
    const time = m.format("HH:mm:ss");
      
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

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return;
    }
    return "Send email to " + email;
  });
};
