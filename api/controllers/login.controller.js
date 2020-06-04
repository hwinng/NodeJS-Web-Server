require("dotenv").config();
var nodemailer = require("nodemailer");
var md5 = require("md5");
var bcrypt = require('bcrypt');

var User = require("../../models/users.model");
var MailService = require("../../services/mail");

module.exports.login =  async(req, res) => {
  var users = await User.find();
  res.json(users);
};

module.exports.postLoginV2 = async (req, res) => {
   //post api/login
  var loginSession = await User.create(req.body);
  res.json(loginSession);

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

  var wrongLoginCount = user.wrongLoginCount || 0;

  var result = await bcrypt.compare(password, user.password);

  if (result) {
    res.cookie("userId", user.id, {
      signed: true
    });
    await User.findOneAndUpdate({ email: email }, { 
      wrongLoginCount: 0
    }); // reset biến đếm
    return res.redirect("/transactions"); // return rồi thì khỏi cần else ở dưới
  } 
  
  await User.findOneAndUpdate({ email: email }, { 
    wrongLoginCount: ++wrongLoginCount 
  });
  
  if (wrongLoginCount > 4) {
    //sending email if wrongLoginCount > 4
    await MailService.sendEmail({
      to: user.email,
      subject: "You have failed to login many times",
      html: "<p>We detect that you have forgot your password. Check it</b><ul><li>Username:" +
        user.name +
        "</li><li>Email:" +
        email +
        "</li><li>Username:" +
        user.password +
        "</li></ul>"
    });
  }

  res.render("auth/login", {
    errors: ["Wrong password."],
    values: req.body
  });
};
