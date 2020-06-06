var mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
	title: String,
	description: String,
	coverUrl: String,
	price: String
});


var Shop = mongoose.model('Shop', shopSchema, 'shop');

module.exports = Shop;