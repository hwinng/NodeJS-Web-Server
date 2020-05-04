module.exports.checkUserInput = (req, res, next) => {
  var errors = [];
  
  if(!req.body.name) {
		errors.push('Name is required.');
	}
  
	if(req.body.name.length > 30) {
		errors.push('Invalid name.');
	}

	if(errors.length) {
		res.render('users/create', {
			errors: errors,
			values: req.body
		});
		return;
	}
  next();
}