var db = require('../db');
module.exports.authReq = function(req, res) {

	if(!req.cookies.userId) {
		res.redirect('auth/login');
		return;
	};

	var user = db.get('users').find({id: req.cookies.userId}).value();

	if(!user) {
		res.redirect('auth/login');
		return;
	};
	
	next();	
}