var Book = require("../models/books.model");

module.exports.index = async (req, res, next) => {
  // do it again //okie//ngon rùi
  //console.log(res.locals.quantity);
  //console.log(res.locals.listCart); //:) // để thằng listCart đó  // h ra thằng index.pug của book show ra đã//yeb qua đó thôi
  
  try {
    var books = await Book.find();
    var a;
    a.b();
    res.render("books/index", {
      books: books,
      quantity: res.locals.quantity
    });
  }catch(error) {
    next(error);
  }
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
  req.body.coverUrl = req.file.path
    .split("\\")
    .slice(1)
    .join("/");

  await Book.create({
                    title: req.body.title,
                    description: req.body.description,
                    coverUrl: req.body.coverUrl
                    })
  res.redirect("/books");
};

module.exports.delete = async (req, res) => {
  var id = req.params.id;
  await Book.findById(id).remove();
  res.redirect("/books");
};

module.exports.update = async (req, res) => {
  var id = req.params.id;
  var book = await Book.findById(id);

  res.render("books/editUpdate", {
    book: book
  });
};

module.exports.postUpdate = async (req, res) => {
  var id = req.params.id;
  await  Book.findByIdAndUpdate(id, {$set: {title:req.body.title, description:req.body.description}})
  // db.get("books")
  //   .find({ id: id })
  //   .assign({ title: req.body.title })
  //   .assign({ description: req.body.description })
  //   .write();
  res.redirect("/books");
};
