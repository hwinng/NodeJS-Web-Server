var User = require('../models/users.model');

module.exports.index = async (req, res) => {

  var users = await User.find();

  res.render("users/index", {
    users: users
  });
}

//user searching
module.exports.search = async (req, res) => {

  var users = await User.find();

  var q = req.query.q;

  var matchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render("users", {
    users: matchedUsers,
    values: q
  });
};

//user creating
module.exports.create = async (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = async (req, res) => {
  req.body.avatar = req.file.path.split('\\').slice(1).join('/');

  var users = await User.find();
  
  
  res.redirect("/users");
};

//user deleting
module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};

//editing
module.exports.editing = (req, res) => {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/edit", {
    user: user
  });
};

module.exports.postEditing = (req, res) => {
  var id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ name: req.body.name })
    .write();
  res.redirect("/users");
};

//update profile user
module.exports.profile = (req, res) => {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render('users/profile', {
    user: user
  })
}

module.exports.postProfile = (req, res) => {
  var id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ name: req.body.name })
    .assign({ avatar: req.file.path.split("\\").slice(1).join('/')})
    .write();
  res.redirect("/users");
};