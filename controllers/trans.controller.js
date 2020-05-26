var shortid = require("shortid");
var db = require("../db");

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 5;
  
  var start = (page - 1) * perPage  ;
  var end = page * perPage;
  
  res.render("transactions/index", {
    transactions: db.get("transactions").value().slice(start, end)
  });
};
module.exports.create =(req, res) => {
    res.render("transactions/create", {
      books: db.get("books").value(),
      users: db.get("users").value()
    });
  };
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    db.get("transactions")
      .unshift(req.body)
      .write();
    res.redirect("/transactions");
  };

module.exports.complete = (req, res) => {
  var id = req.params.id;
  var transaction = db
    .get("transactions")
    .find({ id: id })
    .value();
  res.render("transactions/isCompleted", {
    transaction: transaction
  });
};

module.exports.postState = (req, res) => {
  var id = req.params.id;
  db.get("transactions")
    .find({ id: id })
    .assign({ check: req.body.check })
    .write();
  res.redirect("/transactions");
};
