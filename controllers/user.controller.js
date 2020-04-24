var shortid = require('shortid');	
var db = require('../db');

module.exports.index = function(req, res) {
	res.redirect('/');
}

module.exports.search = function(req, res){
	var name = req.query.name;

	var matchedUsers = db.get("users").value().filter(function(user){
		return user.name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
	});

	res.render('index', {
		users: matchedUsers
	})
};

module.exports.create = function(req, res){
	res.render('users/create');
};

module.exports.postCreate = function(req, res){
	req.body.id = shortid.generate();
	db.get("users").push(req.body).write();

	res.redirect('/');
};

module.exports.getID = function(req, res){
	var id = req.params.id;
	var user = db.get('users').find( {id: id} ).value();

	res.render('users/view', {
		user: user
	})	
};
