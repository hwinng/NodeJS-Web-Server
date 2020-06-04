
var Transaction = require('../models/transactions.model');
var Book = require('../models/books.model');
var User = require('../models/users.model');

module.exports.index = async (req, res) => {
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 5;
  
  // var start = (page - 1) * perPage  ;
  // var end = page * perPage;
  
  var transactions = await Transaction.find() //slice(start, end);
  res.json(transactions);
}
module.exports.create = async (req, res) => {

    var book = await Book.find();
    var user = await User.find(); 
    res.render("transactions/create", {
      books: book,
      users: user
    });
};
module.exports.postCreate = async (req, res) => { 
    await Transaction.create({
                              userId: req.body.userId,
                              bookId: req.body.bookId})
      // .unshift(req.body)
      // .write();
    res.redirect("/transactions");
};

module.exports.complete = async (req, res) => {
  var id = req.params.id;
  var transaction = await Transaction.findById(id);
  res.render("transactions/isCompleted", {
    transaction: transaction
  });
};

module.exports.postState =  async (req, res) => {
  var id = req.params.id;
  await Transaction.findById(id)
                   .update({check:req.body.check})
  res.redirect("/transactions");
}