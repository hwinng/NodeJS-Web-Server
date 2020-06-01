var User = require('../models/users.model');

exports.index = async (req, res) => {

  var users = await User.find();

  res.render("users/index", {
    users: users
  });
}

//USER SEARCHING
exports.search = async (req, res) => {

  var users = await User.find();
  var q = req.query.q;

  var matchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render("users", {
    users: matchedUsers,
    values: q
  });
};

//user creating //Test successfully 
exports.create = async (req, res) => {
  res.render("users/create");
};

exports.postCreate = async (req, res) => {
  // req.body.id = shortid.generate();
  

  // var newUser = new User({_id : req.body.id,
  //                         name: req.body.name,
  //                         avatar: req.body.avatar});
                
  // newUser.save(function (err, res) {
  //     if (err) return console.error(err);
  //     console.log(res.name + " saved to database collection.");
  //   });
  await User.create({
    name: req.body.name,
    avatar: req.file ? req.file.filename : ''
  });

  res.redirect("/users");
};

//user deleting //Test successfully
exports.delete = async (req, res) => {
  var id = req.params.id;
  await User.findById(id).remove();

  res.redirect("/users");
};

//editing //Test successfully
exports.editing = async (req, res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  
  res.render("users/edit", {
    user: user
  });
};

exports.postEditing = async (req, res) => {
  var id = req.params.id;
  await User.findById(id)
            .update({name: req.body.name});
  res.redirect("/users");
};

//UPDATE PROFILE USER //test successfully with mongoose 
exports.profile = async (req, res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  res.render('users/profile', {
    user: user
  })
}

exports.postProfile = async (req, res) => {
  var id = req.params.id;
  await User.findByIdAndUpdate(id, {$set: {name: req.body.name,
                                    avatar: req.file.path.split("\\").slice(1).join('/')}});
// $set: { name: req.body.name, avatar:}});
  // db.get("users")
  //   .find({ id: id })
  //   .assign({ name: req.body.name })
  //   .assign({ avatar: req.file.path.split("\\").slice(1).join('/')})
  //   .write();
  res.redirect("/users");
};