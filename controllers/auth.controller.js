require("dotenv").config();
var nodemailer = require("nodemailer");
var md5 = require("md5");
var User = require("../models/users.model");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var user = await User.findOne({email: email});

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist."],
      value: req.body
    });
    return;
  }

  var loginCount = 0;

  var result = await bcrypt.compare(password, user.password);

  if (result) {
    res.cookie("userId", user.id, {
      signed: true
    });
    res.redirect("/transactions");
  } 
  else {
    ++loginCount;
    User.findOne({ email: email })
        .updateOne({ wrongLoginCount: loginCount })
        
    res.render("auth/login", {
      errors: ["Wrong password."],
      values: req.body
    });
  }

  var wrongLoginCount = parseInt(user.wrongLoginCount);

  if (wrongLoginCount > 4) {
    
    res.render("auth/login");

    //sending email if wrongLoginCount > 4
    var transporter = await nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      }
    });
    var mainOptions = {
      from: "Flowers Sep",
      to: user.email,
      subject: "Test Nodemailer",
      text: "You recieved message from " + process.env.USER,
      html:
        "<p>We detect that you have forgot your password. Check it</b><ul><li>Username:" +
        user.name +
        "</li><li>Email:" +
        email +
        "</li><li>Username:" +
        user.password +
        "</li></ul>"
    };
    
    var info = await transporter.sendMail(mainOptions);
    if (info) {
      console.log("Message sent: " + info.response);
      res.redirect("/");
    }

    if ((email, password)) {
      User.findOne({ email: email })
          .updateOne({ wrongLoginCount: 0 })
       
    }
  }
};
