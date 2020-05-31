var shortid = require("shortid");
var Book = require("../models/books.model");

module.exports.index = async (req, res) => {
  // do it again //okie//ngon rùi
  //console.log(res.locals.quantity);
  //console.log(res.locals.listCart); //:) // để thằng listCart đó  // h ra thằng index.pug của book show ra đã//yeb qua đó thôi
  var books = await Book.find();
  res.render("books/index", {
    books: books,
    quantity: res.locals.quantity
  });
};

module.exports.action = async (req, res) => {
  var books = await Book.find();
  res.render("books/view", {
    books: books
  });
};

module.exports.search = async (req, res) => {
  var books = await Book.find();

  var q = req.query.q;
  var matchedBooks = books.filter(book => book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  res.render("books", {
    books: matchedBooks,
    question: q
  });
};

module.exports.create = (req, res) => {
  res.render("books/create");
};

module.exports.postCreate = async (req, res) => {
  req.body.id = shortid.generate();
  req.body.coverUrl = req.file.path
    .split("\\")
    .slice(1)
    .join("/");

  var books = await Book.find();
      books.insert(req.body);
  res.redirect("/books");
};

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
