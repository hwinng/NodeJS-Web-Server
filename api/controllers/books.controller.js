var Book = require("../../models/books.model");

module.exports.index = async (req, res) => {
  var books = await Book.find();
  res.json(books);
};