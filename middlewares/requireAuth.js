var User = require('../models/users.model');

module.exports.requireAuth = async (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }

  var user = await User.findById(req.signedCookies.userId);

  if (!user) {
    res.redirect("/auth/login");
    return;
  }
  
  res.locals.user = user
  next();
};
