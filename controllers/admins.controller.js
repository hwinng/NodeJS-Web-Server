var Shop = require('../models/shop.model');

exports.index = async (req, res) => {

  var shop = await Shop.find();

  res.render("shop/moderator", {
    shop: shop
  });
}

module.exports.getSellBook = (req, res) => {
  res.render("shop/sell-book");
};

module.exports.postSellBook = async (req, res) => {
  req.body.coverUrl = req.file.path
    .split("\\")
    .slice(1)
    .join("/");

  await Shop.create({
                    title: req.body.title,
                    description: req.body.description,
                    coverUrl: req.body.coverUrl,
                    price: req.body.price
                    })
  res.redirect("/shop");
};
