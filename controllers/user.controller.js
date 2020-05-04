var shortid = require('shortid');	
var db = require('../db');

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
}

//user searching
module.exports.search = (req, res) => {
  var q = req.query.q;
  var matchedUsers = db
    .get("users")
    .value()
    .filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render("users", {
    users: matchedUsers,
    values: q
  });
};

//user creating
module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path;
  
  db.get("users")
    .push(req.body)
    .write();
  
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