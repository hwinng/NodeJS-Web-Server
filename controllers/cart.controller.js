var Session = require('../models/sessions.model')
var shortid = require("shortid");

module.exports.addToCart = async (req, res) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var q = req.query.q;

  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  var count = await Session.findById(sessionId)
    .get("cart." + bookId, 0)
 	.value();

  await Session.findByIdAndUpdate(sessionId)
    .set("cart." + bookId, count + 1)
    .write();

  var rentedBooks = await Session.findById(sessionId)
    .get("cart")
    .value();

  var countTotalRenting = 0;

  for (var rentedBook in rentedBooks) {
    countTotalRenting += rentedBooks[rentedBook];
  }

  res.redirect("/books");
};

module.exports.rent = async (req, res, next) => {
  var listCart = res.locals.listCart;

  if (res.locals.quantity === 0) {
    res.redirect("back");
  }
  
  //get user
  var user = await Session.find({ id: req.signedCookies.userId }) //error: can not read userId from undefined
  
  console.log("mlemm lem", user); //user undefined
  res.redirect("back");
  
  var object = {};
  for (var i = 0; i < res.locals.quantity; i++) {
    object.id = shortid.generate();
    object.userId = res.signedCookies.userId;
    object.bookId = listCart[i].id; 
    object.check = false;
  }
  console.log(object);
};
