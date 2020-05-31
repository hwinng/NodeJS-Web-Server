var mongoose = require('mongoose');

var tranSchema = new mongoose.Schema({
	userId: String,
	bookId: String,
	check: String
});

var Transaction = mongoose.model('Transaction', tranSchema, 'transactions');

module.exports = Transaction;