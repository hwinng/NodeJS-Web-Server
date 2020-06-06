var Shop = require('../models/shop.model');

exports.index = async (req, res) => {

  var shop = await Shop.find();

  res.render("shop/index", {
    shop: shop
  });
}

module.exports.view = async (req, res) => {
	var id = req.params.id;
	var book = await Shop.findById(id);

	res.render("shop/view-selling-book", {
		shop: book
	})
}