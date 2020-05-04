var shortid = require('shortid');	
var db = require('../db');

module.exports.index = (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.search = (req, res) => {
  var q = req.query.q;
  var matchedBooks = db
    .get("books")
    .value()
    .filter(book => book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render("books", {
    books: matchedBooks,
    question: q
  });
}

module.exports.create = (req, res) => {
  res.render("books/create");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .unshift(req.body)
    .write();
  res.redirect("/books");
}

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
};

module.exports.update = (req, res) => {
  db.read();
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("books/editUpdate", {
    book: book
  });
};

module.exports.postUpdate = (req, res) => {
  db.read();
  var id = req.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ title: req.body.title })
    .assign({ description: req.body.description })
    .write();
  res.redirect("/books");
};

