var User = require('../../models/users.model');

exports.index = async (req, res) => {

  var users = await User.find();

  res.render(users);
}