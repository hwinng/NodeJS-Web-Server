var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	avatar: String,
	wrongLoginCount: Number
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;