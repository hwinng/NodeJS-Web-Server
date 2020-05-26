var db = require("../db");

module.exports.addToCart = async (req, res) => {
	var bookId = req.params.bookId;
	var sessionId = req.signedCookies.sessionId;
	var q = req.query.q;

	if(!sessionId) {
		res.redirect('/books');
		return;
	}
	var count = db
		.get('sessions')
		.find({id: sessionId})
		.get('cart.' + bookId, 0)
		.value();

	db.get('sessions')
	  .find({id: sessionId})
	  .set('cart.' + bookId, count + 1)
	  .write();

	var rentedBooks = db.get('sessions')
						.find({id: sessionId})
						.get('cart')
						.value();

	var countTotalRenting = 0;

	for(var rentedBook in rentedBooks ) {
		countTotalRenting += rentedBooks[rentedBook];
	}

	res.render("books/index",{
    	books: db.get('books').value(),
    	amount: countTotalRenting
  })	
}

