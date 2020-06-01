var nodemailer = require("nodemailer");

module.exports.sendEmail = async (options) => {
  var to = options.to;
  var html = options.html;
  var transporter = await nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      }
    });
    var mainOptions = {
      from: "Flowers Sep",
      to: to,
      subject: "Test Nodemailer",
      text: "You recieved message from " + process.env.USER,
      html: html
    };
    
    return transporter.sendMail(mainOptions);
}